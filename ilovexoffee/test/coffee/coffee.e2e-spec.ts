import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Coffee } from "../../src/coffee/coffee.entity";
import { CoffeesModule } from "../../src/coffee/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpExceptionFilter } from "../../src/common/filters/http-exception.filter";
import { WrapResponseInterceptor } from "../../src/common/interceptors/wrap-response.interceptor";
import { TimeoutInterceptor } from "../../src/common/interceptors/timeout.interceptor";
import { CreateCoffeeDto } from "src/coffee/dto/create-coffee.dto/create-coffee.dto";
import request from "supertest";


describe('Feature Coffees- /coffees', () => {


     const coffee = {
            name: 'Test Coffee',
            brand: 'Test Brand',
            flavors: ['chocolate', 'vanilla'],
        };
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CoffeesModule, 
                TypeOrmModule.forRoot({
                  
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'password',
                database: 'postgres',
                autoLoadEntities: true,
                synchronize: true,
            })],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WrapResponseInterceptor(),new TimeoutInterceptor() );
  
        await app.init();
    });

    it('Create [POST /]', () => {
       return  request(app.getHttpServer())
        .post('/coffee')
        .send(coffee as CreateCoffeeDto)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
            const expectedCoffee = expect.objectContaining({
                ...coffee,
                flavors: expect.arrayContaining(
                    coffee.flavors.map(name => expect.objectContaining({ name }))),
            });
           // console.log(body);
            expect(body).toEqual(expectedCoffee);
        });


    });








    it.todo('Get all [GET /]');
    it.todo('Get one [GET /:id]');
    it.todo('Update one [PATCH /:id]');
    it.todo('Delete one [DELETE /:id]');

    afterAll(async () => {
        await app.close();
    });
});