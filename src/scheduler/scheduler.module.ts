import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CapsulesModule } from 'src/capsules/capsules.module';
import { CapsuleMailerModule } from 'src/mailer/mailer.module';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot(), CapsulesModule, CapsuleMailerModule],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class CapsuleSchedulerModule { }
