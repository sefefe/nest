import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { Connection, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity.ts';
import { CoffeeController } from './coffee.controller';
import { ConfigService } from '@nestjs/config';
import { COFFEE_BRANDS } from './CoffeeBarands';
import coffeesConfig from './config/coffees.config';
import { NotFoundException } from '@nestjs/common';
//import { config } from 'process';
//import * as config from '@nestjs/config';
type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  create: jest.fn(),
  findOne: jest.fn(),
});
describe('CoffeeService', () => {
  let service: CoffeeService;
  let coffeeRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        { provide: Connection, useValue: {} },
        { provide: coffeesConfig, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: COFFEE_BRANDS, useValue: [] },
      ],
      controllers: [CoffeeController],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return an coffee', async () => {
        const coffeeId = 1;
        const expectedCoffee = { id: 1, name: 'Test Coffee' };
        coffeeRepository.findOne &&
          coffeeRepository.findOne.mockResolvedValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
  });

  describe('other wise', () => {
    it('should throw the "NotFoundException', async () => {
      const coffeeId = 1;
      coffeeRepository.findOne &&
        coffeeRepository.findOne.mockResolvedValue(undefined);
      try {
        await service.findOne(coffeeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Coffee with ID ${coffeeId} not found `);
      }
    });
  });
});
