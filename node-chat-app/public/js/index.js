var socket = io();
socket.on('connect', function(){
  console.log('Connected to server');

  socket.emit('createMessage', {
    from:'Amauris',
    text:'Yup, that works for me!',
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server')
});

socket.on('newEmail', function(email){
  console.log('New email', email);
}); 

socket.on('newMessage', function(message){
  console.log('newMessge',message);
});