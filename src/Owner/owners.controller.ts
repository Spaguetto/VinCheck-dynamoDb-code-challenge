import { Body, Controller, Get, Post, Put, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { OwnersService } from './owners.service';

import { OwnerDto, OwnerInputDto } from './dto';

@Controller('Owner')
export class OwnersController {
  constructor(private readonly service: OwnersService) {}

  @Get()
  async getAll(): Promise<Array<OwnerDto>> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<OwnerDto> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() dto: OwnerInputDto): Promise<OwnerDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: OwnerInputDto): Promise<OwnerDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
