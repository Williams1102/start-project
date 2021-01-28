import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/auth/local/local-auth.guard';
import { AppService } from './app.service';
import { authDto } from 'src/common/auth/auth.dto';
import { Public } from 'src/common/metadata/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return req.user;
  // }
}
