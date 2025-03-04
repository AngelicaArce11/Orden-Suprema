import express from 'express';
import {corsMiddleware} from './middlewares/cors.js';
import { sequelize } from './database/sequelize.js';
import dbRoutes from './routes/db_routes.js' ;


const app = express();

app.get('/', (req, res) =>{
    res.send('holi')
})


app.use(corsMiddleware());
app.use(express.json())
app.use(dbRoutes);

// Puertos definidos para correr el servidor de express
const port = process.env.PORT || 3000

// Declaramos en que puerto estara escuchando nuestra app
async function main() {
    try{
        await sequelize.sync({force: false, alter:true});
        app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
        })  
    } catch (error){
        console.log("Error db");
    }
    
}

main()
