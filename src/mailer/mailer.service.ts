import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: BaseMailerService) { }

  async sendCapsule(to: string, subject: string, message: string, attachmentUrl?: string) {
    return this.mailerService.sendMail({
      to,
      subject,
      html: `<p>${message}</p>`,
      attachments: attachmentUrl
        ? [
          {
            filename: 'attachment.png',
            path: attachmentUrl,
          },
        ]
        : [],
    });
  }
}
