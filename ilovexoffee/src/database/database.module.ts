import { DynamicModule, Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm/browser';

@Module({
    
})
export class DatabaseModule {
   static register(options: ConnectionOptions): DynamicModule{
        return {
            module: DatabaseModule,
            providers: [
                {
                provide: 'CONNECTION',
                useValue: createConnection(options),
        }]
        }
    } 
}
