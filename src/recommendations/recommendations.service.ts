import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

import { CreateRecommendationDto } from './dto/create-recommendation.dto';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCES_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

@Injectable()
export class RecommendationsService {
  private dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    endpoint: process.env.ENDPOINT_URL,
  });
  private table = 'recommendations';
  async create(createRecommendationDto: CreateRecommendationDto) {
    const restaurants = await this.dynamoDBClient
      .scan({
        TableName: 'restaurants',
      })
      .promise();
    const restaurantItems = restaurants.Items.filter((restaurant) => {
      return restaurant.restaurant_type == createRecommendationDto.restaurant_type &&
        restaurant.kind_of_food == createRecommendationDto.kind_of_food &&
        parseInt(restaurant.restaurant_size) >= parseInt(createRecommendationDto.restaurant_size) &&
        restaurant.pet_friendly == createRecommendationDto.pet_friendly &&
        restaurant.parking == createRecommendationDto.parking &&
        restaurant.babysitter == createRecommendationDto.babysitter;
    });
    restaurantItems.sort((a, b) => b.score-a.score);
    const dishes = await this.dynamoDBClient
      .scan({
        TableName: 'dishes',
      })
      .promise();
    const dishesItems = dishes.Items.filter((restaurant) => {
        return restaurant.ingredients == createRecommendationDto.ingredients &&
          restaurant.kind_of_food == createRecommendationDto.kind_of_food;
      });
    dishesItems.sort((a, b) => a.score - b.score);
    const recommendation = {
      id: uuid(),
      tastes: createRecommendationDto,
      restaurants: restaurantItems,
      dishes: dishesItems,
    };
    await this.dynamoDBClient
      .put({
        TableName: this.table,
        Item: recommendation,
      })
      .promise();
    return recommendation;
  }
}
