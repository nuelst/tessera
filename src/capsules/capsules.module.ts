import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CapsulesController } from './capsules.controller';
import { CapsulesService } from './capsules.service';

@Module({
  controllers: [CapsulesController],
  providers: [CapsulesService],
  imports: [PrismaModule]
})
export class CapsulesModule { }
