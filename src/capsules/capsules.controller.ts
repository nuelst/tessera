import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { CapsulesService } from './capsules.service';
import { UpdateCapsuleDto } from './dto/update-capsule.dto';

// 🔒 TODOS os endpoints deste controller estão protegidos automaticamente
// por causa do APP_GUARD global no AppModule
@Controller('capsules')
export class CapsulesController {
  constructor(private readonly capsulesService: CapsulesService) {}

  @Post()
  create(@Body() createCapsuleDto: Prisma.CapsuleCreateInput, @Request() req) {
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
}
