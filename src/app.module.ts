import { Module, NestModule, MiddlewareConsumer, Header } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TodosModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ds7u3.mongodb.net/${process.env.MONGODB_DATABASE}`,
    ),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  @Header('Content-Type', 'application/json')
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
