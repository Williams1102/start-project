import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'watch.films6420@gmail.com',
          clientId:
            '5681325937-e9dof2lgh9stc3du75j58ag34leoclle.apps.googleusercontent.com',
          clientSecret: 'qMcofyMkq-aSRGUpWaYKz5T7',
          refreshToken:
            '1//04_Vt7KXk0FYMCgYIARAAGAQSNwF-L9IrmA5hSg_OiUnF48f8Rt3iEMmp3hkM2BjzNM5TaRHdr7kcBXw4-JI1e5hH_7Hkx-NE_o8',
        },
      },
      defaults: {
        from: `"Nest-send-mailer" <${process.env.MAILER_user}>`,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
