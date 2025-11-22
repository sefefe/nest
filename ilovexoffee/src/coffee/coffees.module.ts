import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Flavor } from './flavor.entity.ts';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
    controllers: [CoffeeController],
    providers: [CoffeeService]
})
export class CoffeesModule { }
