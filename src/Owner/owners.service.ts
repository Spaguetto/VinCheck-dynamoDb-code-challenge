import { Injectable, NotFoundException } from '@nestjs/common';

import { OwnersRepository } from './owners.repository';

import { OwnerDto, OwnerInputDto } from './dto';

@Injectable()
export class OwnersService {
  constructor(private readonly repository: OwnersRepository) {}

  async getAll(): Promise<Array<OwnerDto>> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<OwnerDto> {
    const Owner = await this.repository.get(id);
    if (!Owner) throw new NotFoundException();
    return Owner;
  }

  async create(Owner: OwnerInputDto): Promise<OwnerDto> {
    return this.repository.create(Owner);
  }

  async update(id: string, OwnerInput: OwnerInputDto): Promise<OwnerDto> {
    const Owner = await this.repository.update(id, OwnerInput);
    if (!Owner) throw new NotFoundException();
    return Owner;
  }

  async delete(id: string): Promise<void> {
    const Owner = await this.repository.delete(id);
    if (!Owner) throw new NotFoundException();
  }
}
