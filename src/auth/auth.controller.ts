import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/metadata/public.decorator';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrate } from './local/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('login')
  async loginService(@Request() req): Promise<any> {
    return this.service.encodeJWT(req.user);
  }
}
