import { Inject, Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';

import { PlateDto } from './dto/plate.dto';
import { PlateInputDto } from './dto/plate-input.dto';

import { TABLE_NAME_TOKEN } from '../database/database.module';

@Injectable()
export class PlateRepository {

  constructor(
    @Inject(TABLE_NAME_TOKEN) private readonly tableName: string,
    private readonly client: DocumentClient
  ) {}

  async getAllPlates(): Promise<PlateDto[]> {
    const result = await this.client.scan({
      TableName: this.tableName
    }).promise();

    return result.Items as PlateDto[];
  }

  async getPlate(plateId: string): Promise<PlateDto> {
    const result = await this.client.get({
      TableName: this.tableName,
      Key: { 
        PK: 'PLATE#' + plateId,
        SK: 'INFO'
      }
    }).promise();

    if(!result.Item) {
      return null;
    }

    return result.Item as PlateDto;
  }

  async createPlate(plateInput: PlateInputDto): Promise<PlateDto> {
    const plateId = uuid();

    const newItem = {
      PK: 'PLATE#' + plateId,
      SK: 'INFO',
      ...plateInput
    };

    await this.client.put({
      TableName: this.tableName,
      Item: newItem
    }).promise();

    return {
      id: plateId,
      ...plateInput
    } as PlateDto;

  }

  async updatePlate(plateId: string, plateInput: PlateInputDto): Promise<PlateDto> {
    await this.client.update({
      TableName: this.tableName,
      Key: {
        PK: 'PLATE#' + plateId,
        SK: 'INFO' 
      },
      UpdateExpression: 'set #make = :make',
      ExpressionAttributeValues: {
        ':make': plateInput.CarMake
      },
      ExpressionAttributeNames: {
        '#make': 'make'
      }
    }).promise();

    return {
      id: plateId,
      ...plateInput
    } as PlateDto;
  }

  async deletePlate(plateId: string): Promise<void> {
    await this.client.delete({
      TableName: this.tableName,
      Key: {
        PK: 'PLATE#' + plateId,
        SK: 'INFO'
      }
    }).promise();
  }

}
