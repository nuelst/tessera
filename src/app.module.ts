import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CapsulesModule } from './capsules/capsules.module';
import { CapsuleMailerModule } from './mailer/mailer.module';
import { PrismaService } from './prisma/prisma.service';
import { CapsuleSchedulerModule } from './scheduler/scheduler.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    CapsulesModule,
    AuthModule,
    CapsulesModule,
    CapsuleSchedulerModule,
    CapsuleMailerModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
