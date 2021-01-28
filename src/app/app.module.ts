import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UseGuards,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MailModule } from '../shared/mailer/mailer.module';
import { AuthModule } from '../common/auth/auth.module';

@Module({
  imports: [
    // set config
    ConfigModule.forRoot({ isGlobal: true }),
    //connect mongodb
    MongooseModule.forRoot(process.env.ATLAS_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      autoIndex: false,
    }),
    UsersModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
