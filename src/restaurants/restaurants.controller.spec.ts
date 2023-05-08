import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let fields = {
    name: 'Bufallo Wings',
    score: 1,
    kind_of_food: 'fast food',
    restaurant_type: 'fast food',
    restaurant_size: '150',
    pet_friendly: false,
    parking: true,
    babysitter: false
  }
  let restaurantService= {
    create: jest.fn(dto => {
      return {
        id: "1",
        ...dto
      }
    }),
    findAll: jest.fn().mockImplementation(() => ([{
      id: '1',
      ...fields
    }])),
    findOne: jest.fn().mockImplementation((id) => ({
      id,
      ...fields
    }))
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [RestaurantsService],
    })
      .overrideProvider(RestaurantsService)
      .useValue(restaurantService)
      .compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a restaurant', () => {
    const dto = {
      name: 'Arroz Chino',
      score: 1,
      kind_of_food: 'Oriental',
      restaurant_type: 'arroz',
      restaurant_size: '150',
      pet_friendly: true,
      parking: true,
      babysitter: false
    };

    expect(controller.create(dto)).toEqual({
      'id': expect.any(String),
      'name': dto.name,
      'score': dto.score,
      'kind_of_food': dto.kind_of_food,
      'restaurant_type': dto.restaurant_type,
      'restaurant_size': dto.restaurant_size,
      'pet_friendly': dto.pet_friendly,
      'parking': dto.parking,
      'babysitter': dto.babysitter
    });

    expect(restaurantService.create).toHaveBeenCalledWith(dto);
  });

  it('Get all restaurants', () => {
    expect(controller.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          score: expect.any(Number),
          kind_of_food: expect.any(String),
          restaurant_type: expect.any(String),
          restaurant_size: expect.any(String),
          pet_friendly: expect.any(Boolean),
          parking: expect.any(Boolean),
          babysitter: expect.any(Boolean)
        })
      ])
    );
    expect(restaurantService.findAll).toHaveBeenCalled();
  })

  it('Get One restaurant', () => {
    expect(controller.findOne('1')).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      score: expect.any(Number),
      kind_of_food: expect.any(String),
      restaurant_type: expect.any(String),
      restaurant_size: expect.any(String),
      pet_friendly: expect.any(Boolean),
      parking: expect.any(Boolean),
      babysitter: expect.any(Boolean)
    });
    expect(restaurantService.findOne).toHaveBeenCalled();
  })
});
