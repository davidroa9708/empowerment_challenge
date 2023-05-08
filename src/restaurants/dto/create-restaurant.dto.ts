import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  restaurant_type: string;

  @ApiProperty()
  @IsString()
  kind_of_food: string;

  @ApiProperty()
  @IsString()
  restaurant_size: string;

  @ApiProperty()
  @IsBoolean()
  pet_friendly: boolean;

  @ApiProperty()
  @IsBoolean()
  parking: boolean;

  @ApiProperty()
  @IsBoolean()
  babysitter: boolean;
}
