import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { user } from 'src/common/users/dto';
import { UsersService } from '../common/users/users.service';
import { authDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async encodeJWT(info: any) {
    const payload = { ...info };
    // console.log(payload);

    return {
      accessToken: this.jwt.sign(payload),
    };
  }

  async findEmailAndLogin(email: string, pass: string): Promise<any> {
    try {
      const info = new user(await this.users.findOneUser(null, email));

      const isCompare = await compareSync(pass, info.password);
      if (!isCompare)
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.BAD_REQUEST,
        );

      const { password, ...result } = info;
      // console.log(result);
      return result;
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }
}
