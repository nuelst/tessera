import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';
import { CapsulesService } from './capsules.service';
import { UpdateCapsuleDto } from './dto/update-capsule.dto';


@Controller('capsules')
export class CapsulesController {
  constructor(private readonly capsulesService: CapsulesService) { }

  @Post()
  create(@Body() createCapsuleDto: Prisma.CapsuleCreateInput, @Req() req) {
    console.log("chamaou aqui create capsule")
    console.log('[req]', req);

    const { sub: userId } = req.sub;
    return this.capsulesService.create(createCapsuleDto, userId);
  }

  @Get()
  findAll() {
    return this.capsulesService.findAll();
  }

  @Get('me')
  findAllCapsulesByUser(@Request() req) {
    const { sub: userId } = req.sub;

    return this.capsulesService.findAllCapsulesByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capsulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapsuleDto: UpdateCapsuleDto) {
    return this.capsulesService.update(id, updateCapsuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capsulesService.remove(id);
  }

  @Get('status/overview')
  @ApiOperation({ summary: 'Get capsules status overview' })
  async getStatusOverview() {
    const pending = await this.capsulesService.countByStatus('pending');
    const sent = await this.capsulesService.countByStatus('sent');
    const failed = await this.capsulesService.countByStatus('failed');
    const total = pending + sent + failed;

    return {
      total,
      pending,
      sent,
      failed,
      overview: {
        pendingPercentage: total > 0 ? ((pending / total) * 100).toFixed(1) : '0',
        sentPercentage: total > 0 ? ((sent / total) * 100).toFixed(1) : '0',
        failedPercentage: total > 0 ? ((failed / total) * 100).toFixed(1) : '0',
      }
    };
  }

  @Get('status/pending')
  @ApiOperation({ summary: 'Get pending capsules ready to send' })
  async getPendingCapsules() {
    const now = new Date();
    return await this.capsulesService.findPendingToSend(now);
  }

  @Get('status/failed')
  @ApiOperation({ summary: 'Get failed capsules' })
  async getFailedCapsules() {
    return await this.capsulesService.findFailedToRetry();
  }
}
