import express from 'express';

const app = express();

app.get('/', (req, res) =>{
    res.send('holi')
})


// Puertos definidos para correr el servidor de express
const port = process.env.PORT || 3001

// Declaramos en que puerto estara escuchando nuestra app
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})