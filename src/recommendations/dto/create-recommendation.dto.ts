import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateRecommendationDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

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
  @IsString()
  ingredients: string;

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
