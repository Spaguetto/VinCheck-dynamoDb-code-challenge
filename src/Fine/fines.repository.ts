import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { FineDto, FineInputDto } from './dto';

import { TABLE_NAME_TOKEN } from '../database/database.module';

@Injectable()
export class FinesRepository {
  constructor(
    @Inject(TABLE_NAME_TOKEN) private readonly tableName: string,
    private readonly client: AWS.DynamoDB.DocumentClient,
  ) {}

  async getUserFines(userId: string): Promise<Array<FineDto>> {
    const result = await this.client
      .query({
        TableName: this.tableName,
        KeyConditionExpression: 'PK = :PK and begins_with(SK, :FINE)',
        ExpressionAttributeValues: { ':PK': userId, ':FINE': 'FINE' },
      })
      .promise();
    return (result.Items as Array<FineDto>);
  }

  async get(userId: string, fineId: string): Promise<FineDto> {
    const { Item } = await this.client
      .get({ TableName: this.tableName, Key: { PK: userId, SK: fineId } })
      .promise();
    if (!Item) return null;

    const fine = new FineDto();
    fine.fineId = fineId;
    fine.fineType = Item.fineType;
    fine.costValue = Item.costValue;
    fine.fineCreationDate = Item.fineCreationDate;

    return fine;
  }

  async create(
    userId: string,
    { fineType, costValue }: FineInputDto,
  ): Promise<FineDto> {
    const fineId = `FINE${uuid()}`;
    const fineCreationDate = new Date(Date.now());
    const item = {
      PK: userId,
      SK: fineId,
      fineType,
      costValue,
      fineCreationDate,
      type: 'FINE',
    };
    await this.client.put({ TableName: this.tableName, Item: item }).promise();

    const createdFine = new FineDto();
    createdFine.fineId = fineId;
    createdFine.fineType = fineType;
    createdFine.costValue = costValue;
    createdFine.fineCreationDate = fineCreationDate;


    console.log('createdFine: ', createdFine);
    return createdFine;
  }

  async createFine(userId: string, fineId: string, { fineType, costValue }: FineInputDto): Promise<FineDto> {
    const fine = await this.get(userId, fineId);
    if (!fine) return fine;

    await this.client
      .update({
        TableName: this.tableName,
        Key: { PK: userId, SK: fineId },
        UpdateExpression: 'set #fineType = :fineType, #costValue =:costValue',
        ExpressionAttributeNames: { '#fineType': 'fineType', '#costValue': 'costValue' },
        ExpressionAttributeValues:{ ':fineType': fineType, ':costValue': costValue },
      })
      .promise();

    fine.fineType = fineType;
    fine.costValue = costValue;
    return fine;
  }


  async updateFine(
    userId: string,
    fineId: string,
    { fineType, costValue }: FineInputDto,
  ): Promise<FineDto> {
    const fine = await this.get(userId, fineId);
    if (!fine) return fine;
    const updatedFine = await this.client
      .update({
        TableName: this.tableName,
        Key: { PK: userId, SK: fineId },
        UpdateExpression: 'SET fineType = :fineType, costValue = :costValue',
        ExpressionAttributeValues: {
          ':fineType': fineType,
          ':costValue': costValue,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updatedFine.Attributes as FineDto;
  }

  async deleteFine(userId: string, fineId: string): Promise<FineDto> {
    const fine = await this.get(userId, fineId);
    if (fine) await this.client
      .delete({ TableName: this.tableName, Key: { PK: userId, SK: fineId } })
      .promise();
    return fine;
  }
}