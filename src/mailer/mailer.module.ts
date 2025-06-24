import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: '"Time Capsule" <no-reply@timecapsule.com>',
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class CapsuleMailerModule { }
