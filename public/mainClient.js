// main.js (cliente)
var socket = io.connect('http://localhost:3003/');
socket.on('connect', function () {
    console.log('Conexión con el servidor establecida');
    
    // Emitir un evento al servidor para probar la comunicación
    socket.emit('prueba', '¡Hola servidor!');
});

// Escuchar un evento del servidor
socket.on('respuesta', function (mensaje) {
    console.log('Respuesta del servidor:', mensaje);
});
