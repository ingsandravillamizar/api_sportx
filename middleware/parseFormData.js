// src/middlewares/formDataMiddleware.js

/**
 * Middleware para parsear los datos de formulario antes de la validación
 * Convierte strings JSON en objetos y ajusta los tipos de datos
 */
const parseFormData = (req, res, next) => {
    try {
        // Parsear details si viene como string
        if (req.body.details && typeof req.body.details === 'string') {
            req.body.details = JSON.parse(req.body.details);
        }
        
        // Convertir categoryId a número si existe
        if (req.body.categoryId) {
            req.body.categoryId = parseInt(req.body.categoryId);
        }
        
        // Convertir otros campos numéricos si son necesarios
        if (req.body.user) {
            req.body.user = req.body.user.toString();
        }
        
        next();
        } catch (error) {
        console.error('Error parseando FormData:', error);
        return res.status(400).json({ 
            errors: [{ msg: "Error al procesar datos del formulario" }] 
        });
        }
};

export { parseFormData };