import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private todo: Todo;
  private todos: Todo[] = [];

  constructor(@InjectModel('Todos') private readonly todosModel: Model<Todo>) {}

  async getTodos(): Promise<any> {
    this.todos = await this.todosModel.find().exec();
    return this.todos.map(todo => ({
      id: todo.id,
      priority: todo.priority,
      text: todo.text,
      done: todo.done,
    }));
  }

  async getSingleTodo(id: string): Promise<any> {
    this.todo = await this.findTodo(id);
    return {
      id: this.todo.id,
      priority: this.todo.priority,
      text: this.todo.text,
      done: this.todo.done,
    };
  }

  async findTodo(id: string): Promise<Todo> {
    try {
      this.todo = await this.todosModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find todo.');
    }
    if (!this.todo) {
      throw new NotFoundException('Could not find todo.');
    }
    return this.todo;
  }

  async insertTodo(text: string, priority: number, done: boolean):Promise<Todo> {
    this.todo = new this.todosModel({
      text,
      priority,
      done,
    });
    if (done) {
      setTimeout(async () => {
        await this.todosModel.deleteOne({ _id: this.todo.id }).exec();
      }, 5 * 60 * 1000);
    }
    await this.todo.save();
    return this.getSingleTodo(this.todo.id);
  }

  async updateTodo(id: string, text: string, priority: number, done: boolean) {
    this.todo = await this.findTodo(id);
    if (text) {
      this.todo.text = text;
    }
    if (priority) {
      this.todo.priority = priority;
    }
    if (done) {
      this.todo.done = done;
    }
    await this.todo.save();
    if (done) {
        setTimeout(async () => {
          await this.todosModel.deleteOne({ _id: this.todo.id }).exec();
        }, 5 * 60 * 1000);
      }
    return this.getSingleTodo(this.todo.id);
  }
  async deleteTodo(id: string) {
    const result = await this.todosModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find todo.');
    }
    return {};
  }
}
