import { Injectable, NotFoundException } from '@nestjs/common';

import { FinesRepository } from './fines.repository';

import { FineDto, FineInputDto } from './dto';

@Injectable()
export class FinesService {

  constructor(private readonly finesRepository: FinesRepository) {}

  async getUserFines(userId: string): Promise<FineDto[]> {
    return this.finesRepository.getUserFines(userId);
  }

  async getFineById(userId: string, fineId: string): Promise<FineDto> {
    const fine = await this.finesRepository.get(userId, fineId);
    if (!fine) {
      throw new NotFoundException();
    }
    return fine;
  }

  async createFine(userId: string, fineInput: FineInputDto): Promise<FineDto> {
    return this.finesRepository.create(userId, fineInput); 
  }

  async updateFine(userId: string, fineId: string, fineInput: FineInputDto): Promise<FineDto> {
    const fine = await this.finesRepository.updateFine(userId, fineId, fineInput);
    if (!fine) {
      throw new NotFoundException();
    }
    return fine;
  }

  async deleteFine(userId: string, fineId: string): Promise<void> {
    const fine = await this.finesRepository.deleteFine(userId, fineId);
    if (!fine) {
      throw new NotFoundException();
    }
  }

}