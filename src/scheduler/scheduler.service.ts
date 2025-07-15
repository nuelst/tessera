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
  ) { }

  @Cron('*/2 * * * *') // a cada 2 minutos (mais frequente)
  async handleCapsuleDispatch() {
    const now = new Date();
    this.logger.log(`🔍 Checking for capsules to send at ${now.toISOString()}`);

    const capsules = await this.capsulesService.findPendingToSend(now);

    if (capsules.length === 0) {
      this.logger.log('📭 No capsules ready to send');
      return;
    }

    this.logger.log(`📮 Found ${capsules.length} capsule(s) ready to send`);

    for (const capsule of capsules) {
      try {
        this.logger.log(`📧 Sending capsule ${capsule.id} to ${capsule.recipientEmail}`);

        await this.mailerService.sendCapsule({
          to: capsule.recipientEmail,
          subject: '🕰️ Sua Cápsula do Tempo Chegou!',
          message: capsule.message,
          attachmentUrl: capsule.attachmentUrl ?? undefined,
        });

        await this.capsulesService.markAsSent(capsule.id);
        this.logger.log(`✅ Successfully sent capsule ${capsule.id} to ${capsule.recipientEmail}`);
      } catch (err) {
        this.logger.error(`❌ Failed to send capsule ${capsule.id}:`, err.message);
        await this.capsulesService.markAsFailed(capsule.id);
      }
    }
  }

  // Cron para retry de cápsulas falhadas (a cada hora)
  @Cron('0 * * * *')
  async retryFailedCapsules() {
    this.logger.log('🔄 Checking for failed capsules to retry');

    const failedCapsules = await this.capsulesService.findFailedToRetry();

    if (failedCapsules.length === 0) {
      this.logger.log('📭 No failed capsules to retry');
      return;
    }

    this.logger.log(`🔄 Found ${failedCapsules.length} failed capsule(s) to retry`);

    for (const capsule of failedCapsules) {
      try {
        this.logger.log(`🔄 Retrying capsule ${capsule.id} to ${capsule.recipientEmail}`);

        await this.mailerService.sendCapsule({
          to: capsule.recipientEmail,
          subject: '🕰️ Sua Cápsula do Tempo Chegou!',
          message: capsule.message,
          attachmentUrl: capsule.attachmentUrl ?? undefined,
        });

        await this.capsulesService.markAsSent(capsule.id);
        this.logger.log(`✅ Successfully retried capsule ${capsule.id}`);
      } catch (err) {
        this.logger.error(`❌ Retry failed for capsule ${capsule.id}:`, err.message);
        // Mantém como failed para tentar novamente na próxima hora
      }
    }
  }
}
