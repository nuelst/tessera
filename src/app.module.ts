import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
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
    CapsuleMailerModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
