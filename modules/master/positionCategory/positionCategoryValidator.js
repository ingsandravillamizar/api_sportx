import { body, check, validationResult } from "express-validator";

const validateCreatetPositionCategory = [
    body('name').exists().notEmpty().isLength({min: 4, max: 30}),
    body('description').exists().notEmpty().isLength({min: 0, max: 150}),
    body('user').optional().isString().withMessage('El usuario debe ser una cadena de texto'),
    body('userMod').optional().isString().withMessage('El usuarioMod debe ser una cadena de texto'),


    (req, res, next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status('403')
            res.send({errors : error.array()}) 
        } 
    }
];

const validateGettPositionCategory = [
    check('id').exists().notEmpty(),

    (req, res, next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status('403')
            res.send({errors : error.array()}) 
        } 
    }
]

export {
    validateCreatetPositionCategory,
    validateGettPositionCategory
};
