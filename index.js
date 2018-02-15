var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.sockets.emit('new connection', { text: 'A new user has connection!' });

  socket.on('chat message', function(msg){
    io.sockets.emit('chat message', `${msg.user}: ${msg.msg}`);
  });

  io.sockets.emit('disconnect', { text: 'A user has disconnected.' });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});