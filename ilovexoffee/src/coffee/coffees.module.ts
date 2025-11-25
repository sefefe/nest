import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity.ts';
import { COFFEE_BRANDS } from './CoffeeBarands';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor]),ConfigModule],
    controllers: [CoffeeController],
    providers: [ CoffeeService,{provide: COFFEE_BRANDS, useFactory: ()=> ['buddy brew', 'nescafe']}],
    exports: [CoffeeService],
})
export class CoffeesModule { }
