const express = require('express');
const http = require('http'); // Requerir el módulo http
const socketIO = require('socket.io'); // Requerir el módulo socket.io

const PORT = process.env.PORT || 3003;
const app = express();
const server = http.createServer(app); // Crear un servidor HTTP con express

// Crear un servidor de socket.io y pasarle el servidor HTTP
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
