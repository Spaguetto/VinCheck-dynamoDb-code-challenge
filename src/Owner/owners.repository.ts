import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { OwnerDto, OwnerInputDto } from './dto';

import { TABLE_NAME_TOKEN } from '../database/database.module';

@Injectable()
export class OwnersRepository {
  constructor(
    @Inject(TABLE_NAME_TOKEN) private readonly tableName: string,
    private readonly client: AWS.DynamoDB.DocumentClient,
  ) {}

  async getAll(): Promise<Array<OwnerDto>> {
    const result = await this.client.scan({ TableName: this.tableName }).promise();
    return (result.Items as Array<OwnerDto>);
  }

  async get(id: string): Promise<OwnerDto> {
    const { Item } = await this.client
      .get({ TableName: this.tableName, Key: { PK: id, SK: '#PROFILE' } })
      .promise();
    if (!Item) return null;

    const Owner = new OwnerDto();
    Owner.id = id;
    Owner.OwnerName = Item.OwnerName;
    Owner.LicenseId = Item.LicenseId;

    return Owner;
  }

  async create(Owner: OwnerInputDto): Promise<OwnerDto> {
    const id = uuid();
    const item = { PK: id, SK: '#PROFILE', type: 'Owner', ...Owner };
    await this.client.put({ TableName: this.tableName, Item: item }).promise();
    return { id, ...Owner };
  }

  async update(id: string, { OwnerName, LicenseId }: OwnerInputDto): Promise<OwnerDto> {
    const Owner = await this.get(id);
    if (!Owner) return Owner;

    await this.client
      .update({
        TableName: this.tableName,
        Key: { PK: id, SK: '#PROFILE' },
        UpdateExpression: 'set #OwnerName = :n, #LicenseId =:e',
        ExpressionAttributeNames: { '#OwnerName': 'OwnerName', '#LicenseId': 'LicenseId' },
        ExpressionAttributeValues:{ ':s': OwnerName, ':n': LicenseId },
      })
      .promise();

    return { id, OwnerName, LicenseId };
  }

  async delete(id: string): Promise<OwnerDto> {
    const Owner = await this.get(id);
    if (Owner) await this.client
      .delete({ TableName: this.tableName, Key: { PK: id, SK: '#PROFILE' } })
      .promise();
    return Owner;
  }
}
