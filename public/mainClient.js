// main.js (cliente)
// Conexión al Servidor WebSocket
var socket = io.connect('http://localhost:3003/');

  // Escuchar un evento del servidor
  socket.on('respueta', function (mensaje) {
    console.log('Respuesta del servidor:', data);
  });

// Manejar el evento 'respuesta' del servidor
socket.on('respuesta', function(messages){
  var messageList = document.getElementById('message-list');
  messageList.innerHTML = ''; // Limpiar la lista de mensajes antes de actualizarla
  
  // Iterar sobre los mensajes y agregarlos al HTML
  messages.forEach(function(message){
      var html = `<div class="message">
                      <strong>${message.autor}</strong>
                      <em>${message.texto}</em>
                  </div>`;
      messageList.innerHTML += html;
         // Envía los datos del mensaje como console.log
    socket.emit('nuevoMensaje', { autor: message.autor, texto: message.texto });
    console.log('Mensaje enviado al servidor:', { autor: message.autor, texto: message.texto });
    
  });
});

//<!-- Enviar el nombre de usuario junto con el mensaje al servidor -->
function addMessage(e){
  var loggedInUser = document.getElementById('loggedInUser').textContent;
  var username = loggedInUser.trim(); // Obtener solo el nombre de usuario
  var payload = {
      autor: username, // Enviar solo el nombre de usuario
      texto: document.getElementById('texto').value
  };
  socket.emit('new-message', payload);
  document.getElementById('texto').value = ''; // Limpiar el campo de texto después de enviar el mensaje
  return false; // Para evitar que el formulario se envíe
}

// Función para manejar el inicio de sesión
function login(username, password) {
    socket.emit('login', { username: username, password: password });
}

// Escuchar la respuesta del servidor al inicio de sesión
socket.on('login-response', function(response) {
  if (response.success) {
      // Inicio de sesión exitoso, actualizar la interfaz de usuario
      // Por ejemplo, redirigir al usuario a otra página
      window.location.href = '/index.html';
  } else {
      // Inicio de sesión fallido, manejar de acuerdo al error
      // Por ejemplo, mostrar un mensaje de error al usuario
      alert('Inicio de sesión fallido. Por favor, verifica tus credenciales e inténtalo de nuevo.');
  }
});

