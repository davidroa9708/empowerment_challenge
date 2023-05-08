import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

describe('DishesController', () => {
  let controller: DishesController;
  let fields = {
    name: "Arroz Chino",
    score: 1,
    kind_of_food: "Oriental",
    ingredients: "arroz"
  };
  let dishesService= {
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
      controllers: [DishesController],
      providers: [DishesService],
    })
      .overrideProvider(DishesService)
      .useValue(dishesService)
      .compile();

    controller = module.get<DishesController>(DishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a dish', () => {
    const dto = {
      name: 'Arroz Chino',
      score: 1,
      kind_of_food: 'Oriental',
      ingredients: 'arroz'
    };

    expect(controller.create(dto)).toEqual({
      'id': expect.any(String),
      'name': dto.name,
      'score': dto.score,
      'kind_of_food': dto.kind_of_food,
      'ingredients': dto.ingredients
    });

    expect(dishesService.create).toHaveBeenCalledWith(dto);
  });


  it('Get all dishes', () => {
    expect(controller.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          score: expect.any(Number),
          kind_of_food: expect.any(String),
          ingredients: expect.any(String)
        })
      ])
    );
    expect(dishesService.findAll).toHaveBeenCalled();
  })

  it('Get One dish', () => {
    expect(controller.findOne('1')).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      score: expect.any(Number),
      kind_of_food: expect.any(String),
      ingredients: expect.any(String)
    });
    expect(dishesService.findOne).toHaveBeenCalled();
  })
});
