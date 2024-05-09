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
    res.sendFile(path.join(publicPath, 'index.html'));
});

// main.js (servidor)
io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con socket');

    // Manejar el evento 'prueba' enviado desde el cliente
    socket.on('prueba', function (mensaje) {
        console.log('Mensaje recibido del cliente:', mensaje);

        // Emitir un evento 'respuesta' de vuelta al cliente
        socket.emit('respuesta',{
            id:1,
            texto:"¡Hola cliente! Soy el servidor.",
            autor:"Daniel Hernadez Olague"} 
        );
    });
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
