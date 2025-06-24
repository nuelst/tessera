import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { CapsulesModule } from './capsules/capsules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CapsulesModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
