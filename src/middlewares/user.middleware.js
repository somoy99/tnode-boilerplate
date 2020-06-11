import { check, validationResult } from 'express-validator'

export const loginParamCheck = [
  check('username')
    .exists()
    .isString(),
  check('password')
    .exists()
    .isString(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  }
]
