const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routeConfig = require('../routes/routes.js');
const PORT = process.env.PORT || 3003; // Cambia 3003 por el puerto que quieras
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);



// Configura CORS para permitir solo solicitudes desde tu dominio de Azure
const corsOptions = {
    origin: ['https://manejador.azurewebsites.net', 'http://dhoubuntu.fullstack.com.mx:3003','http://dhoubuntu.fullstack.com.mx'],
  };
  // Aplica CORS con las opciones personalizadas
  app.use(cors(corsOptions));
  

// Configura la ruta para tu archivo HTML personalizado
app.get('/public/swaggerh', (req, res) => {
    res.sendFile(__dirname + '../public/swaggerh.html');
});

// Configura la ruta para la especificación Swagger JSON
app.get('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '../swagger.json');
});

// Middleware to handle POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de express-session
app.use(session({
    secret: 'Lainod', // Cambia esto por una cadena de texto aleatoria y segura
    resave: false,
    saveUninitialized: true
}));

// Configure routes
routeConfig(app);

// Handling not found routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});


//Esto es para las cookies de terceros
app.use((req, res, next) => {
    res.cookie('mycookie', 'value', { sameSite: 'None', secure: true });
    next();
  });
  

// Crear servidor HTTPS
 // Cambia 3003 por el puerto que quieras
 //server.listen(PORT, () => {
   //  console.log(`Server running at https://manejador.azurewebsites.net:${PORT}/`);
 //});
 
 server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
module.exports = app; // Exporta app para que pueda ser utilizado en otros archivos
