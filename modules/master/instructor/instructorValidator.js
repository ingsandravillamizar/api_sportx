import { body, check, validationResult } from "express-validator";

const validateCreateInstructor = [

    // Tipo de identificación
    body("identificationTypeId")
        .exists().withMessage("El tipo de identificación es obligatorio")
        .isInt().withMessage("Debe ser un número entero"),

    // Número de identificación
    body("identification")
        .exists().withMessage("El número de identificación es obligatorio")
        .isInt().withMessage("Debe ser un número entero"),

    // Fotografía
    body("photo")
        .optional(),

    // Nombres
    body("name")
        .exists().withMessage("El nombre es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ min: 4, max: 100 }).withMessage("Debe tener entre 4 y 100 caracteres"),

    // Fecha de nacimiento
    body("bornDate")
        .exists().withMessage("La fecha de nacimiento es obligatoria")
        .isDate().withMessage("Debe ser una fecha válida"),

    // Correo electrónico
    body("email")
        .exists().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Debe ser un correo electrónico válido"),

    // Celular
    body("celphone")
        .optional()
        .isString().withMessage("El celular debe ser una cadena de texto")
        .isLength({ max: 10 }).withMessage("El número de celular debe tener máximo 10 dígitos"),

    
    // Observaciones
    body("observation")
        .optional()
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 255 }).withMessage("Debe tener máximo 255 caracteres"),


    // Usuario creador
    body("user")
        .exists().withMessage("El usuario es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 50 }).withMessage("Debe tener máximo 50 caracteres"),

    // Usuario modificador
    body("userMod")
        .exists().withMessage("El usuario modificador es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 50 }).withMessage("Debe tener máximo 50 caracteres"),



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

const validateGetInstructor = [
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
    validateCreateInstructor,
    validateGetInstructor
};
