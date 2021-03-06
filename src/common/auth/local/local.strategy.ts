import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { authDto } from '../auth.dto';

@Injectable()
export class LocalStrate extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.auth.findEmailAndLogin(email, password);
    if (user.error) {
      throw new UnauthorizedException(user);
    }
    return new authDto(user);
  }
}
