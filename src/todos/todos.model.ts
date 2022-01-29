import * as mongoose from 'mongoose';

export const TodosSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]*$/,
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
    required: true,
  },
  done: {
    type: Boolean,
    default: null,
  },
});

export interface Todo {
  id: string;
  text: string;
  priority: number;
  done: boolean;
}