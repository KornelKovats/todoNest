import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  constructor(
    @InjectModel('Todos') private readonly todosModel: Model<Todo>,
  ) {}

  async getTodos() {
      const todosList = await this.todosModel.find().exec();
      return todosList;
  }

  async insertTodo(text: string, priority: number, done: boolean){
    const newTodo = new this.todosModel({
        text,
        priority,
        done,
      });
      const result = await newTodo.save();
      return result.id as string;
  }
}
