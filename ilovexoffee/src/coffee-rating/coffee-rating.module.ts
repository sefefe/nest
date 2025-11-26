import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from '../coffee/coffees.module';
import { DatabaseModule } from '../database/database.module';


@Module({
    providers: [CoffeeRatingService],
    imports: [ DatabaseModule.register({
        type: 'postgres',
        host: 'localhost',
        password: 'password',
        port: 5432,
        username: 'postgres',
        database: 'postgres',
    }) , CoffeesModule]
})
export class CofferRatingModule {}
