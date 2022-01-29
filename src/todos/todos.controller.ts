import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  
  import { TodosService } from './todos.service';
  import { Todo, TodosSchema } from './todos.model';
  import { Model } from 'mongoose';
  
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
      const generatedId = await this.todosService.insertTodo(
        todoText,
        todoPriority,
        todoDone,
      );
      return { id: generatedId };
    }

    @Put(':id')
    async updateTodod(
        @Body('text') todoText: string,
        @Body('priority') todoPriority: number,
        @Body('done') todoDone: boolean,
        @Param('id') todoId: string
    ) {
      const updatedTodo = await this.todosService.updateTodo(todoId, todoText, todoPriority, todoDone);
      return updatedTodo;
    }
  }
  