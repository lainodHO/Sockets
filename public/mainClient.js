// main.js (cliente)
var socket = io.connect('http://localhost:3003/');

  // Escuchar un evento del servidor
  socket.on('respueta', function (mensaje) {
    console.log('Respuesta del servidor:', data);
  });


  //Esto es un socket renderizado para enviar la respuesta de mi servidor
  function render(data){
    var html = `<div id="respuesta">
                    <strong>${data.autor}</strong>
                    <em>${data.texto}</em>
                </div>`;
    document.getElementById('respuesta').innerHTML = html;
}


  //Esto es un socket renderizado para enviar la respuesta de mi servidor
  function addMessage(e){
    var payload = {
        autor: document.getElementById('autor').value,
        texto: document.getElementById('texto').value
    };
    socket.emit('new-message', payload);
    return false;
}