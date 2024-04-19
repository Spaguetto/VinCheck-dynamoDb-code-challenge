import { Injectable, NotFoundException } from '@nestjs/common';

import { PlateRepository } from './plate.repository';

import { PlateDto, PlateInputDto } from './dto';

@Injectable()
export class PlatesService {
  constructor(private readonly platesRepository: PlateRepository) {}

  async getPlates(): Promise<PlateDto[]> {
    return this.platesRepository.getAllPlates();
  }

  async getPlateById(plateId: string): Promise<PlateDto> {
    const plate = await this.platesRepository.getPlate(plateId);
    if (!plate) {
      throw new NotFoundException();
    }
    return plate;
  }

  async createPlate(plateInput: PlateInputDto): Promise<PlateDto> {
    return this.platesRepository.createPlate(plateInput);
  }

  async updatePlate(
    plateId: string,
    plateInput: PlateInputDto,
  ): Promise<PlateDto> {
    const plate = await this.platesRepository.updatePlate(plateId, plateInput);
    if (!plate) {
      throw new NotFoundException();
    }
    return plate;
  }

  async deletePlate(plateId: string): Promise<void> {
    await this.platesRepository.deletePlate(plateId);
  }
}
