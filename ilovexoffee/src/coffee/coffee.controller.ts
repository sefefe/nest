import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('coffee')
@UsePipes(ValidationPipe)
@Controller('coffee')
export class CoffeeController {

  constructor(private readonly coffeeService: CoffeeService) {}
 @Public()
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    // await new Promise(resolve => setTimeout(resolve,5000));
    return this.coffeeService.findAll(paginationQueryDto);
  }
   //@UsePipes(ValidationPipe)
 
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeeService.create(createCoffeeDto);
  }
  
  @Patch(':id')
  update(@Param('id') id:number, @Body(/*ValidationPipe*/) updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}
