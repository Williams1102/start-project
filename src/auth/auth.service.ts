import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/common/users/dto';
import { UsersService } from '../common/users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async encodeJWT(info: any) {
    const payload = { email: info.email, active: info.isActive };
    console.log(payload);

    return {
      accessToken: this.jwt.sign(payload),
    };
  }

  async findEmailAndLogin(email: string, pass: string): Promise<any> {
    try {
      const info = await this.users.findOneUser(null, email);

      if (info && info.password === pass) {
        const { password, ...result } = info;

        return result;
      } else return info.error ? info : { error: 'Password is incorrect' };
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }
}
