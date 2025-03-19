import { body, check, validationResult } from "express-validator";

const validateCreateCompany = [
    
    body('identification').exists().withMessage("El tipo de identificación es obligatorio")
        .notEmpty().isLength({min: 5, max: 15}),
    body("logo").optional(),
    body('name').exists().notEmpty().isLength({min: 4, max: 30}),
    body('slogan').exists().notEmpty().isLength({min: 0, max: 200}),
    body('observation').exists().notEmpty().isLength({min: 0, max: 200}),
    body('address').exists().notEmpty().isLength({min: 0, max: 100}),
    body("email")
        .exists().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("celphone")
        .optional()
        .isString().withMessage("El celular debe ser una cadena de texto")
        .isLength({ max: 10 }).withMessage("El número de celular debe tener máximo 10 dígitos"),
    
    body('ownerIdentification').exists().withMessage("El tipo de identificación es obligatorio")
        .notEmpty().isLength({min: 5, max: 15}),
    body('ownerName').exists().notEmpty().isLength({min: 4, max: 30}),
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

const validateGetCompany = [
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
    validateCreateCompany,
    validateGetCompany
};
