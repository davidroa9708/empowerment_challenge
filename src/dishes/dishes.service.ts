import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

import { CreateDishDto } from './dto/create-dish.dto';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCES_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

@Injectable()
export class DishesService {
  private dynamoDBClient = new AWS.DynamoDB.DocumentClient({
      endpoint: process.env.ENDPOINT_URL,
    });
  private table = 'dishes';
  async create(createDishDto: CreateDishDto) {
    const input = {
      id: uuid(),
      name: createDishDto.name,
      score: createDishDto.score,
      ingredients: createDishDto.ingredients,
      kind_of_food: createDishDto.kind_of_food,
    };
    await this.dynamoDBClient
      .put({
        TableName: this.table,
        Item: input,
      })
      .promise();
    return input;
  }

  async findAll() {
    const results = await this.dynamoDBClient
      .scan({
        TableName: this.table,
      })
      .promise();

    return results.Items;
  }

  async findOne(id: string) {
    const result = await this.dynamoDBClient
      .get({
        TableName: this.table,

        Key: { id },
      })
      .promise();

    return result.Item;
  }
}
