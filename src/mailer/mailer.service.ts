import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailerDto } from './dto/mailer.dto';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: BaseMailerService) {}

  async sendCapsule(mailerDto: MailerDto) {
    try {
      const result = await this.mailerService.sendMail({
        to: mailerDto.to,
        subject: mailerDto.subject,
        html: `<p>${mailerDto.message}</p>`,
        attachments: mailerDto.attachmentUrl
          ? [
              {
                filename: 'attachment.png',
                path: mailerDto.attachmentUrl,
              },
            ]
          : [],
      });
      console.log('[result]', result);
      return {
        message: 'Email sent successfully',
        result,
      };
    } catch (error) {
      console.error('[Mailer Error]', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
