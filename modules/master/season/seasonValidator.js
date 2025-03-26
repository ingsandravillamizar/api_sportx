import { body, check, validationResult } from "express-validator";

const validateCreateSeason = [

    body('name')
        .exists().withMessage("El nombre de la temporada es obligatoria")
        .notEmpty().withMessage("El nombre de la temporada no puede estar vacía")
        .isLength({min: 4, max: 15}).withMessage("Entre 4 y 15 caracteres"),
        
    body('description')
        .exists().withMessage("La descripción es obligatoria")
        .notEmpty().withMessage("La descripción no puede estar vacía")
        .isLength({ max: 150 }).withMessage("Máximo 150 caracteres"),

    // Validación de fechas
    body("startDate")
        .exists().withMessage("Fecha Inicio de Temporada Obligatoria")
        .isISO8601().withMessage("Debe ser una fecha válida"),

    body("endDate")
        .exists().withMessage("Fecha Final de Temporada Obligatoria")
        .isISO8601().withMessage("Debe ser una fecha válida")
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error("La fecha final debe ser posterior a la fecha de inicio");
            }
            return true;
        }),

    // Validación de valores monetarios
    body('enrollmentFee')
        .exists().withMessage("El valor de matrícula es obligatorio")
        .isFloat({ min: 0 }).withMessage("Debe ser un número positivo"),

    body('monthlyFee')
        .exists().withMessage("El valor de mensualidad es obligatorio")
        .isFloat({ min: 0 }).withMessage("Debe ser un número positivo"),

    // Validación de observación (opcional)
    body('observation')
        .optional()
        .isString().withMessage("La observación debe ser una cadena de texto"),

    // Validación de estado (booleano)
    body('state')
        .optional()
        .isBoolean().withMessage("El estado debe ser verdadero o falso"),

    // Validación de usuarios
    body('user')
        .exists().withMessage("El usuario es obligatorio")
        .isString().withMessage("El usuario debe ser una cadena de texto"),

    body('userMod')
        .exists().withMessage("El usuario de modificación es obligatorio")
        .isString().withMessage("El usuario de modificación debe ser una cadena de texto"),


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
