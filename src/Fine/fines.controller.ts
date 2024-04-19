import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FineDto } from './dto/fine.dto';
import { FineInputDto } from './dto/fine-input.dto';
import { FinesService } from './fines.service';


@Controller('fines')
export class FinesController {
  constructor(private readonly service: FinesService) {}

  @Get()
  async getUserFines(@Param('userId') userId: string): Promise<Array<FineDto>> {
    return this.service.getUserFines(userId);
  }

  @Get(':FineId')
  async getById(
    @Param('userId') userId: string, @Param('FineId') FineId: string,
  ): Promise<FineDto> {
    return this.service.getFineById(userId, FineId);
  }

  @Post(':userId/createFines')
  async create(
    @Param('userId') userId: string, @Body() dto: FineInputDto,
  ): Promise<FineDto> {
    return this.service.createFine(userId, dto);
  }

  @Put(':FineId')
  async update(
    @Param('userId') userId: string, @Param('FineId') FineId: string, @Body() dto: FineInputDto,
  ): Promise<FineDto> {
    return this.service.updateFine(userId, FineId, dto);
  }

  @Delete(':FineId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('userId') userId: string, @Param('FineId') FineId: string,
  ): Promise<void> {
    await this.service.deleteFine(userId, FineId);
  }
}
