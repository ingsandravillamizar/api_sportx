import { body, check, validationResult } from "express-validator";

const validateCreateSession = [
    // Fecha de la sesión
    body("sessionDate")
        .exists().withMessage("La fecha de la sesión es obligatoria")
        .isISO8601().withMessage("Formato de fecha inválido (usar YYYY-MM-DD)"),

    // Categoría
    body("categoryId")
        .exists().withMessage("La categoría es obligatoria")
        .isInt().withMessage("Debe ser un ID numérico"),

    // Foto de evidencia (opcional)
    body("photo")
        .optional()
        .isString().withMessage("Debe ser una ruta válida")
        .isLength({ max: 255 }).withMessage("Máximo 255 caracteres"),

    // Observaciones
    body("observation")
        .optional()
        .isString().withMessage("Debe ser texto válido")
        .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),

    // Detalles de asistencia
    body("details")
        .exists().withMessage("Los detalles de asistencia son obligatorios")
        .isArray({ min: 1 }).withMessage("Debe contener al menos un estudiante")
        .custom((details) => {
            return details.every(detail => {
                return typeof detail.studentId === 'number' && 
                       typeof detail.attended === 'boolean';
            });
        }).withMessage("Formato incorrecto en los detalles de asistencia"),

    // Validación manual
    body("details.*.studentId")
        .exists().withMessage("ID de estudiante es obligatorio")
        .isInt().withMessage("ID de estudiante debe ser numérico"),

    body("details.*.attended")
        .exists().withMessage("Estado de asistencia es obligatorio")
        .isBoolean().withMessage("El estado de asistencia debe ser true/false"),

    // Usuario
    body("user")
        .exists().withMessage("Usuario es obligatorio")
        .isString().withMessage("Usuario debe ser texto")
        .isLength({ max: 50 }).withMessage("Máximo 50 caracteres"),

    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(400).json({ errors: error.array() });
        }
    }
];

const validateUpdateSession = [
    // ID de sesión
    check('id')
        .exists().withMessage("ID de sesión es requerido")
        .isInt().withMessage("ID debe ser numérico"),

    // Campos actualizables
    body("sessionDate")
        .optional()
        .isISO8601().withMessage("Formato de fecha inválido (usar YYYY-MM-DD)"),

    body("categoryId")
        .optional()
        .isInt().withMessage("Debe ser un ID numérico"),

    body("observation")
        .optional()
        .isString().withMessage("Debe ser texto válido")
        .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),

    // Detalles (opcional en actualización)
    body("details")
        .optional()
        .isArray({ min: 1 }).withMessage("Debe contener al menos un estudiante")
        .custom((details) => {
            return details.every(detail => {
                return typeof detail.studentId === 'number' && 
                       typeof detail.attended === 'boolean';
            });
        }).withMessage("Formato incorrecto en los detalles de asistencia"),

    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(400).json({ errors: error.array() });
        }
    }
];

const validateGetSession = [
    check('id')
        .exists().withMessage("ID de sesión es requerido")
        .isInt().withMessage("ID debe ser numérico"),

    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(400).json({ errors: error.array() });
        }
    }
];

export {
    validateCreateSession,
    validateUpdateSession,
    validateGetSession
};