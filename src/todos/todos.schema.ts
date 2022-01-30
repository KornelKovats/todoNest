import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  id: string;

  @Prop()
  text: string;

  @Prop()
  priority: number;

  @Prop()
  done: boolean;
}

export const TodosSchema = SchemaFactory.createForClass(Todo);
