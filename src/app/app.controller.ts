import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local/local-auth.guard';
import { AppService } from './app.service';
import { from } from 'rxjs';
import { user } from 'src/common/users/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   const u: user = new user(req.user);
  //   return u;
  // }
}
