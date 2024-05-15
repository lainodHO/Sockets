const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const routeConfig = require('./routes/routes');
const fs = require('fs');
const https = require('https'); // Importa el módulo https de Node.js
const PORT = process.env.PORT || 3003; // Cambia 3003 por el puerto que quieras
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importa tu archivo de definición Swagger

// Configura CORS para permitir solo solicitudes desde tu dominio de Azure
// const corsOptions = {
 //    origin: 'https://manejador.azurewebsites.net'
 //  };
  
  // Aplica CORS con las opciones personalizadas
 //  app.use(cors(corsOptions));
  

// Configura la ruta para tu archivo HTML personalizado
app.get('/public/swaggerh', (req, res) => {
    res.sendFile(__dirname + '/public/swaggerh.html');
});

// Configura la ruta para la especificación Swagger JSON
app.get('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

// Middleware to handle POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Configuración de HTTPS
//const options = {
   // key: fs.readFileSync('ruta/a/tu/llave/privada.key'),
   // cert: fs.readFileSync('SSL/DigiCertGlobalRootCA.crt'),
  //  ca: [
 //       fs.readFileSync('SSL/DigiCert_Global_Root_G2.crt'),
  //      fs.readFileSync('SSL/Microsoft_RSA_Root_Certificate_Authority_2017.crt')
  //  ]
//};

// Crear servidor HTTPS
//https.createServer(options, app).listen(PORT, () => {
//    console.log(`Server running at http://localhost:${PORT}/`);
//});

// Crear servidor HTTPS
 // Cambia 3003 por el puerto que quieras
 app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}/`);
 });
 

module.exports = app; // Exporta app para que pueda ser utilizado en otros archivos