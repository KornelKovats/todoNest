import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';

const mockTodo = {
  id: '123',
  text: 'Test',
  priority: 3,
  done: false,
};

const todosArray = [
  {
    id: '61f48a2c13de75bfdbe2e195',
    priority: 3,
    text: 'asd',
    done: true,
  },
  {
    id: '61f48afc35baa680bc5905da',
    priority: 4,
    text: 'kornel',
    done: null,
  },
];

describe('TodosService', () => {
  let service: TodosService;
  let model: Model<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken('Todos'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTodo),
            constructor: jest.fn().mockResolvedValue(mockTodo),
            find: jest.fn(),
            deleteOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = await module.resolve<TodosService>(TodosService);
    model = module.get<Model<Todo>>(getModelToken('Todos'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('#getTodos | should return all todos', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todosArray),
    } as any);
    const todos = await service.getTodos();
    expect(todos).toEqual(todosArray);
  });

  it('#getTodos | should return empty array if there is no todo ', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);
    const todos = await service.getTodos();
    expect([]).toEqual([]);
  });

  it('#getSingleTodo | should return single todo', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockTodo),
    } as any);
    const todo = await service.getSingleTodo('123');
    expect(todo).toEqual(mockTodo);
  });

  it('#getSingleTodo | throw could not find todo', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(undefined),
    } as any);
    try {
      await service.getSingleTodo('999');
    } catch (error) {
      expect(error.message).toBe('Could not find todo.');
    }
  });

  it('#getSingleTodo | throw error while mocking results', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error()),
      } as any);
    try {
      await service.getSingleTodo('999');
    } catch (error) {
      expect(error.message).toBe('Could not find todo.');
    }
  });
});
