import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CapsulesService } from './capsules.service';
import { CreateCapsuleDto } from './dto/create-capsule.dto';
import { UpdateCapsuleDto } from './dto/update-capsule.dto';

@Controller('capsules')
export class CapsulesController {
  constructor(private readonly capsulesService: CapsulesService) {}

  @Post()
  create(@Body() createCapsuleDto: CreateCapsuleDto) {
    return this.capsulesService.create(createCapsuleDto);
  }

  @Get()
  findAll() {
    return this.capsulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capsulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapsuleDto: UpdateCapsuleDto) {
    return this.capsulesService.update(+id, updateCapsuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capsulesService.remove(+id);
  }
}
