import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

import { CreateRestaurantDto } from './dto/create-restaurant.dto';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCES_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

@Injectable()
export class RestaurantsService {
  private dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    endpoint: process.env.ENDPOINT_URL,
  });
  private table = 'restaurants';
  async create(createRestaurantDto: CreateRestaurantDto) {
    const input = {
      id: uuid(),
      name: createRestaurantDto.name,
      score: createRestaurantDto.score,
      restaurant_type: createRestaurantDto.restaurant_type,
      kind_of_food: createRestaurantDto.kind_of_food,
      restaurant_size: createRestaurantDto.restaurant_size,
      pet_friendly: createRestaurantDto.pet_friendly,
      parking: createRestaurantDto.parking,
      babysitter: createRestaurantDto.babysitter,
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
