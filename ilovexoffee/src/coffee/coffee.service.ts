import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeeService {
    private coffeeDtos: CreateCoffeeDto[] = [];
    private coffees: Coffee[] = [
        {  id:1,name: 'Cappuccino', brand: 'Starbucks', flavors: ['chocolate', 'vanilla'] },
        {  id:2,name: 'Latte', brand: 'Costa', flavors: ['caramel', 'hazelnut'] },
    ];
findAll() {
        return this.coffees;
    }       

    findOne(id: string) {
        throw 'Not implemented yet';
      /*  const coffee = this.coffees.find(coffee => coffee.id === +id);
      if(!coffee)
        throw new NotFoundException();
     return coffee;*/
    }
    create(createCoffeeDto: CreateCoffeeDto) {
        this.coffeeDtos.push(createCoffeeDto);
        return createCoffeeDto;
     
    }
    update( updateData: CreateCoffeeDto){
        this.coffeeDtos.push(updateData);
    }
    remove(id: string) {
        //this.coffees = this.coffees.filter(coffee => coffee.id !== +id);
    }

}
