import { body, check, validationResult } from "express-validator";

const validateCreateidentificationType = [
    body('code').exists().notEmpty().isLength({min: 2, max: 4}),
    body('name').exists().notEmpty().isLength({min: 5, max: 30}),
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

const validateGetidentificationType = [
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
    validateCreateidentificationType,
    validateGetidentificationType
};
