import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete
} from '@nestjs/common';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getALlTodos() {
    return this.todosService.getTodos();
  }

  @Get(':id')
  async getSingleTodos(@Param('id') todoId: string) {
    return this.todosService.getSingleTodo(todoId);
  }

  @Post()
  async addTodo(
    @Body('text') todoText: string,
    @Body('priority') todoPriority: number,
    @Body('done') todoDone: boolean,
  ) {
      const insertedTodo = await this.todosService.insertTodo(
        todoText,
        todoPriority,
        todoDone,
      );
    return insertedTodo;
  }

  @Put(':id')
  async updateTodod(
    @Body('text') todoText: string,
    @Body('priority') todoPriority: number,
    @Body('done') todoDone: boolean,
    @Param('id') todoId: string,
  ) {
    const updatedTodo = await this.todosService.updateTodo(
      todoId,
      todoText,
      todoPriority,
      todoDone,
    );
    return updatedTodo;
  }
  @Delete(':id')
  async deleteSingletodo(@Param('id') todoId: string) {
    return this.todosService.deleteTodo(todoId);
  }
}
