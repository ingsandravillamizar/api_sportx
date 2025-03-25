import { body, check, validationResult } from "express-validator";

const validateCreateSeason = [
    body('description').exists().notEmpty().isLength({min: 0, max: 150}),
    body("startDate: ").exists().withMessage("Fecha Inicio de Temporada Obligatoria").isDate().withMessage("Debe ser una fecha válida"),
    body("endDate: ").exists().withMessage("Fecha Final de Temporada Obligatoria").isDate().withMessage("Debe ser una fecha válida"),

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

const validateGetSeason = [
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
    validateCreateSeason,
    validateGetSeason
};
