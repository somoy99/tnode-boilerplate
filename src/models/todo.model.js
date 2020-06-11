import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false }
})

export const Todo = model('Todo', schema)
