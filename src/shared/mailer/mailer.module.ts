import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILER_user,
          pass: process.env.MAILER_pass,
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
