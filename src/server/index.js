var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

var userCount = 0;
io.on('connection', (socket) => {
  console.log('A user connected', ++userCount);
  io.sockets.emit('Users', userCount);

  socket.on('Movement', (msg) => {
    console.log('Moved by ', msg);
  });

  socket.on('disconnect', () => {
    userCount --;
    console.log('A user disconnected');
    io.sockets.emit('Users', userCount);
  });
});
