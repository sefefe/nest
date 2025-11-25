import { Controller, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffee/coffees.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CofferRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import appConfig from './app.config';

@Module({

  imports: [
     /* TypeOrmModule.forRoot({
    
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT?+process.env.DATABASE_PORT:5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
}), */
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT?+process.env.DATABASE_PORT:5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
})}),
    ConfigModule.forRoot({
      load:[appConfig]
     /*  validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(), */

      })      
    ,
    
    CoffeesModule, CofferRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
