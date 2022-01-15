import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { ProductsController } from './todos.controller';
import { ProductsService } from './todos.service';
import { TodoSchema} from './todos.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Todos', schema: TodoSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class TodosModule {}
