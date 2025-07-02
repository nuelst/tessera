import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CapsulesService } from 'src/capsules/capsules.service';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly capsulesService: CapsulesService,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('*/5 * * * *') // a cada 5 minutos
  async handleCapsuleDispatch() {
    const now = new Date();

    const capsules = await this.capsulesService.findPendingToSend(now);

    for (const capsule of capsules) {
      try {
        await this.mailerService.sendCapsule({
          to: capsule.recipientEmail,
          subject: 'Your time capsule has arrived!',
          message: capsule.message,
          attachmentUrl: capsule.attachmentUrl ?? undefined,
        });

        await this.capsulesService.markAsSent(capsule.id);
        this.logger.log(
          `Sent capsule ${capsule.id} to ${capsule.recipientEmail}`,
        );
      } catch (err) {
        this.logger.error(`Failed to send capsule ${capsule.id}`, err);
      }
    }
  }
}
