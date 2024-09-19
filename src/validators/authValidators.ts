import { body } from 'express-validator';

export const loginValidationRules = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

export const registerValidationRules = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('Surname is required')
];

export const updateUserValidationRules = [
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('surname').optional().notEmpty().withMessage('Surname is required')
];
