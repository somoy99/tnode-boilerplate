import { Todo } from '../models/todo.model'

export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await Todo.find({})
    res.status(200).json({
      result: allTodo,
      error: null,
      msg: 'successfully fetched all items'
    })
  } catch (error) {
    console.log(error)

    res.status(204).json({
      result: null,
      error: 'internal server error',
      msg: 'internal server error'
    })
  }
}

export const addTodo = async (req, res) => {
  try {
    const result = await Todo.create({
      name: req.body.name
    })

    res.status(200).json({
      result: result,
      error: null,
      msg: 'successfully added an item'
    })
  } catch (error) {
    console.log(error)
    res.status(204).json({
      result: null,
      error: 'internal server error',
      msg: 'internal server error'
    })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({
      _id: req.body._id
    })

    res.status(200).json({
      result: result,
      error: null,
      msg: 'successfully deleted an item'
    })
  } catch (error) {
    console.log(error)
    res.status(204).json({
      result: null,
      error: 'internal server error',
      msg: 'internal server error'
    })
  }
}

export const updateTodo = async (req, res) => {
  try {
    const result = await Todo.findOneAndUpdate(
      {
        _id: req.body._id
      },
      {
        $set: {
          name: req.body.name
        }
      },
      {
        upsert: true,
        new: true
      }
    )

    res.status(200).json({
      result: result,
      error: null,
      msg: 'successfully update an item'
    })
  } catch (error) {
    console.log(error)
    res.status(204).json({
      result: null,
      error: 'internal server error',
      msg: 'internal server error'
    })
  }
}
