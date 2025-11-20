import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';


@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService) {}
    @Get()
    findAll() {
       return this.coffeeService.findAll();
    }
      @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeeService.findOne(id);
    }
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeeService.create(createCoffeeDto);
    }
    @Patch()
    update( @Body() updateCoffeeDto: CreateCoffeeDto  ) {
    return this.coffeeService.update(updateCoffeeDto);

    }
    @Delete(':id')
    remove(@Param('id') id: string) {
       return this.coffeeService.remove(id);
    }
}
