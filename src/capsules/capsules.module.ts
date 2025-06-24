import { Module } from '@nestjs/common';
import { CapsulesService } from './capsules.service';
import { CapsulesController } from './capsules.controller';

@Module({
  controllers: [CapsulesController],
  providers: [CapsulesService],
})
export class CapsulesModule {}
