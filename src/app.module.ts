import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [RestaurantsModule, DishesModule, RecommendationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
