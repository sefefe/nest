import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity.ts';
import { COFFEE_BRANDS } from './CoffeeBarands';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor]),ConfigModule,ConfigModule.forFeature(coffeesConfig)],
    controllers: [CoffeeController],
    providers: [ CoffeeService,{provide: COFFEE_BRANDS, useFactory: ()=> ['buddy brew', 'nescafe']}],
    exports: [CoffeeService],
})
export class CoffeesModule { }
