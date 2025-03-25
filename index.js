import express from "express";
import cors from "cors";
import db from "./config/db.js";

/***
 * Rutas 
 */
import userRoutes from './auth/routes/userRoutes.js';
import authRoutes from './auth/routes/authRoutes.js';


/***  Rutas Maestros del sistema */
import identificationTypeRoutes from './modules/master/identificationType/identificationTypesRoutes.js';
import categoryRoutes from './modules/master/Category/categoryRoutes.js';
import clubRoutes from './modules/master/club/clubRoutes.js';
import positionCategoryRoutes  from './modules/master/positionCategory/positionCategoryRoutes.js'
import positionRoutes from './modules/master/position/positionRoutes.js'
import studentRoutes from './modules/master/student/studentRoutes.js'
import companyRoutes from './modules/master/Company/companyRoutes.js'
import instructorRoutes from './modules/master/instructor/instructorRoutes.js'
import seasonsRoutes from './modules/master/season/seasonRoutes.js'


/*** Crear app   */
const app = express();

app.use('/api_sportx', express.static('public'));

/*** Habilitar CORS para todas las rutas   */
app.use(cors()); 


// Habilitar express.json para parsear JSON
/*** Conexión a la base de datos y eliminación de índices duplicados  */
app.use(express.json());


/*** Conexión a la base de datos y eliminación de índices duplicados  */
//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.info('Conexion exitosa a la base de datos')
} catch (error) {
    console.log(error)
}

/*** Rutas  */
app.use('/api_sportx/users', userRoutes);
app.use('/api_sportx/auth', authRoutes);
app.use('/api_sportx/identificationtypes', identificationTypeRoutes);
app.use('/api_sportx/categories', categoryRoutes);
app.use('/api_sportx/clubes', clubRoutes);
app.use('/api_sportx/clubes', clubRoutes);
app.use('/api_sportx/positioncategories', positionCategoryRoutes);
app.use('/api_sportx/positions', positionRoutes);
app.use('/api_sportx/students', studentRoutes);
app.use('/api_sportx/companies', companyRoutes);
app.use('/api_sportx/instructors', instructorRoutes);
app.use('/api_sportx/seasons', instructorRoutes);


// hola
/***
 * Configurar puerto y levantar servidor
 */  
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

/***
 * Ruta principal
 */
app.get('/api_sportx', (req, res) => {
    res.send("Hola sportx te encuentras ON");
});
