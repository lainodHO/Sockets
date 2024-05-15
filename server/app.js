const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const routeConfig = require('../routes/routes.js');
const PORT = process.env.PORT || 3003; // Cambia 3003 por el puerto que quieras
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


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


//Configuracion para el socket
// Variable para llevar el conteo
let contadorConexiones = 0;
// Objeto de mensaje inicial
const initialMessage = {
    id: 1,
    texto: "¡Hola a Todo Mundo! Soy un mensaje del servidor.",
    autor: "Servidor"
};
// Inicializar el arreglo de mensajes con el mensaje inicial
const messages = [initialMessage];

// Emitir un evento 'message' de vuelta al cliente cuando se conecte
io.on('connection', function (socket) {
    contadorConexiones++; // Incrementar el contador
    console.log('Alguien se ha conectado con socket');
    console.log('Número de conexiones: ' + contadorConexiones); // Imprimir el contador
    
    // Emitir el mensaje inicial al cliente cuando se conecta
    socket.emit("message", messages);

   // Manejar el evento 'new-message' enviado por el cliente
socket.on("new-message", function(data) {
    // Modificar la estructura del mensaje para incluir el nombre de usuario
    const newMessage = {
        autor: data.autor,
        texto: data.texto
    };
    
    // Agregar el nuevo mensaje al arreglo de mensajes
    messages.push(newMessage);
    
    // Emitir el arreglo de mensajes actualizado de vuelta a todos los clientes
    io.emit('respuesta', messages);
   
});
});


// Crear servidor HTTPS
 // Cambia 3003 por el puerto que quieras
 server.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}/`);
 });
 

module.exports = app; // Exporta app para que pueda ser utilizado en otros archivos
