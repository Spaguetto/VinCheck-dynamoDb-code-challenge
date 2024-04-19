import { Body, Controller, Get, Post, Put, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { PlatesService } from './plate.service';

import { PlateDto, PlateInputDto } from './dto';

@Controller('plates')
export class PlatesController {

  constructor(private readonly service: PlatesService) {}

  @Get()
  async getPlates(): Promise<PlateDto[]> {
    return this.service.getPlates();
  }  

  @Get(':id')
  async getPlateById(@Param('id') id: string): Promise<PlateDto> {
    return this.service.getPlateById(id);
  }

  @Post()
  async create(@Body() plateDto: PlateInputDto): Promise<PlateDto> {
    return this.service.createPlate(plateDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() plateDto: PlateInputDto): Promise<PlateDto> {
    return this.service.updatePlate(id, plateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.deletePlate(id);
  }

}
