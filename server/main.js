const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3003;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'foro.html'));
});

// Variable para llevar el conteo
let contadorConexiones = 0;

// Objeto de mensaje inicial
const initialMessage = {
    id: 1,
    texto: "¡Hola cliente! Soy un mensaje del servidor.",
    autor: "Daniel Hernández Olague"
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

    // Manejar el evento 'nuevo-message' enviado por el cliente
    socket.on("new-message", function(data) {
        // Agregar el nuevo mensaje al arreglo de mensajes
        messages.push(data);
        
        // Emitir el arreglo de mensajes actualizado de vuelta a todos los clientes
        io.emit('respuesta', messages);
    });
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
