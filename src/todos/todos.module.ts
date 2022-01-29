import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosSchema } from './todos.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Todos', schema: TodosSchema}])],
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}
