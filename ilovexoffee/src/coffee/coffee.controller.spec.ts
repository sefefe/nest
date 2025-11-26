import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Connection, Repository } from 'typeorm';
import coffeesConfig from './config/coffees.config';
import { Flavor } from './flavor.entity.ts';
import { COFFEE_BRANDS } from './CoffeeBarands';



describe('CoffeeController', () => {
  let controller: CoffeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    providers: [ CoffeeService,
             { provide: Connection, useValue: {} },
             { provide:  coffeesConfig, useValue: {} },
             { provide: getRepositoryToken(Coffee), useValue: {} },
             { provide: getRepositoryToken(Flavor), useValue: {} },
             { provide: COFFEE_BRANDS, useValue: [] }],
      controllers: [CoffeeController],
    }).compile();

    controller = module.get<CoffeeController>(CoffeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
});
