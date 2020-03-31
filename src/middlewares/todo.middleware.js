import { check, validationResult } from 'express-validator';

export const addTodoParamCheck = [
    check('name').exists(), 
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        next();
    }
}];

export const deleteTodoParamCheck = [
    check('_id').exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next();
        }
    }    
];

export const updateTodoParamCheck = [
    check('_id').exists(),
    check('name').exists(),
    (req, res, next) => {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next();
        }
    }
];
