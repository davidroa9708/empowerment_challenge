import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsController', () => {
  let controller: RecommendationsController;
  let recommendationService= {
    create: jest.fn(dto => {
      return {
        id: "1",
        tastes: {
          email: 'user@demo.com',
          kind_of_food: 'Oriental',
          restaurant_type: 'Bufet',
          restaurant_size: '150',
          ingredients: "alas",
          pet_friendly: true,
          parking: true,
          babysitter: false
        },
        restaurants: [
          {
            id: "1",
            babysitter: true,
            parking: true,
            score: 10,
            pet_friendly: true,
            restaurant_size: "150",
            kind_of_food: "Oriental",
            name: "Bufalo Wings",
            restaurant_type: "Bufet"
          }
        ],
        dishes:[
          {
            id: "1",
            kind_of_food: "Spicy",
            name: "Alas Wings",
            score: 10,
            ingredients: "alas",
          }
        ]
      }
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [RecommendationsService],
    })
      .overrideProvider(RecommendationsService)
      .useValue(recommendationService)
      .compile();

    controller = module.get<RecommendationsController>(RecommendationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a recommendation', () => {
    const dto = {
      email: 'user@demo.com',
      kind_of_food: 'Oriental',
      restaurant_type: 'Bufet',
      restaurant_size: '150',
      ingredients: "alas",
      pet_friendly: true,
      parking: true,
      babysitter: false
    };

    expect(controller.create(dto)).toEqual({
      'id': expect.any(String),
      'tastes': {
        'email': dto.email,
        'ingredients': dto.ingredients,
        'kind_of_food': dto.kind_of_food,
        'restaurant_type': dto.restaurant_type,
        'restaurant_size': dto.restaurant_size,
        'pet_friendly': dto.pet_friendly,
        'parking': dto.parking,
        'babysitter': dto.babysitter
      },
      restaurants: [
        {
          id: "1",
          name: expect.any(String),
          score: expect.any(Number),
          kind_of_food: expect.any(String),
          restaurant_type: expect.any(String),
          restaurant_size: expect.any(String),
          pet_friendly: expect.any(Boolean),
          parking: expect.any(Boolean),
          babysitter: expect.any(Boolean)
        }
      ],
      dishes:expect.arrayContaining([
        expect.objectContaining({
          id: "1",
          name: expect.any(String),
          score: expect.any(Number),
          kind_of_food: expect.any(String),
          ingredients: expect.any(String)
        })
      ])
    });

    expect(recommendationService.create).toHaveBeenCalledWith(dto);
  });
});
