import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [PrismaModule]
})
export class UserModule { }
