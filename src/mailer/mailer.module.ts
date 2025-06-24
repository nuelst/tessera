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
          user: 'dzgn47@gmail.com',
          pass: '4799DziGn',
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
