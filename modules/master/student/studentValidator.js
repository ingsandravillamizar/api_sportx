import { body, check, validationResult } from "express-validator";

const validateCreateStudent = [

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

    // Categoría
    body("categoryId")
        .exists().withMessage("La categoría es obligatoria")
        .isInt().withMessage("Debe ser un número entero"),

    // Posición
    body("positionId")
        .exists().withMessage("La posición es obligatoria")
        .isInt().withMessage("Debe ser un número entero"),

    // Club de origen
    body("clubId")
        .exists().withMessage("El club de origen es obligatorio")
        .isInt().withMessage("Debe ser un número entero"),

    // Identificación del acudiente
    body("acudientIdentification")
        .exists().withMessage("La identificación del acudiente es obligatoria")
        .isInt().withMessage("Debe ser un número entero"),

    // Nombre del acudiente
    body("acudientName")
        .exists().withMessage("El nombre del acudiente es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 100 }).withMessage("Debe tener máximo 100 caracteres"),

    // Celular del acudiente
    body("acudientCelphone")
        .optional()
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 10 }).withMessage("Debe tener máximo 10 dígitos"),

    // Firma del acudiente
    body("acudientSignature")
        .exists().withMessage("La firma del acudiente es obligatoria")
        .isString().withMessage("Debe ser una cadena de texto"),


    // Datos del padre y de la madre opcionales

    body("fatherName")
        .optional(),
    body("fatherCelphone")
        .optional(),
    body("motherName")
        .optional(),
    body("motherCelphone")
        .optional(),
    //

    // Seguridad (Seguro médico)
    body("medicalInsurance")
        .exists().withMessage("El seguro médico es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 100 }).withMessage("Debe tener máximo 100 caracteres"),

    // Tipo de sangre
    body("bloodType")
        .exists().withMessage("El tipo de sangre es obligatorio")
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 4 }).withMessage("Debe tener máximo 4 caracteres"),

    // Condiciones médicas
    body("medicalConditions")
        .optional()
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 255 }).withMessage("Debe tener máximo 255 caracteres"),

    // Observaciones
    body("observation")
        .optional()
        .isString().withMessage("Debe ser una cadena de texto")
        .isLength({ max: 255 }).withMessage("Debe tener máximo 255 caracteres"),



    body("jerseyNumber")
        .optional(),

    //JersyName
    body("jerseyName")
    .exists()
    .isString().withMessage("El nombre de la camiseta es necesario")
    .isLength({ max: 15 }).withMessage("debe tener máximo 15 caracteres "),

    //JersySize
    body("jerseySize")
    .exists()
    .isString().withMessage("Talla de la camiseta es necesario")
    .isLength({ max: 2 }).withMessage("debe tener máximo 2 caracteres "),

    // Estado del estudiante
    body("state")
        .optional()
        .isBoolean().withMessage("Debe ser un valor booleano"),

    // Consentimiento para fotos/videos
    body("consent")
        .exists().withMessage("El consentimiento es obligatorio")
        .isBoolean().withMessage("Debe ser un valor booleano"),

    // Consentimiento para datos personales
    body("data_privacy")
        .exists().withMessage("El consentimiento para datos personales es obligatorio")
        .isBoolean().withMessage("Debe ser un valor booleano"),

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

const validateGetStudent = [
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
    validateCreateStudent,
    validateGetStudent
};
