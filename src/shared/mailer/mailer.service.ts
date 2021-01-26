import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { mailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  public sendMail(content: mailDto): void {
    this.mailer
      .sendMail({
        to: content.toEmail,
        subject: content.subject, // Subject line
        text: content.content, // plain text body
        html: `<b>${content.content}</b>`, // html body
      })
      .then((info) => {
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      })
      .catch((err) => {
        console.log('Error sent:', err);
      });
  }
}
