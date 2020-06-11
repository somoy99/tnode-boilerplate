import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true }
})

export const User = model('User', schema)
