import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { TodosService } from './todos.service';
  
  @Controller('products')
  export class TodosController {
    constructor(private readonly todosService: TodosService) {}
  
    @Get()
    getALlTodos() {
      return this.todosService.getTodos();
    }

    @Post()
    async addProduct(
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
  }
  