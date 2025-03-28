import { body, check, validationResult } from "express-validator";

const validateCreateCatInstructor = [
    
    body('categoryId')
        .exists().withMessage('El ID de la categoría es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un número entero positivo.'),

    body('instructorId')
        .exists().withMessage('El ID del instructor es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID del instructor debe ser un número entero positivo.'),

    body('user').optional().isString().withMessage('El usuario debe ser una cadena de texto'),
    body('userMod').optional().isString().withMessage('El usuarioMod debe ser una cadena de texto'),


    // hola

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

const validateGetCatInstructor = [
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
    validateCreateCatInstructor,
    validateGetCatInstructor
};
