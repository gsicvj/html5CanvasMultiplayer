let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

let players = new Map();

let broadcastCurrentPositions = () => {
  if (players.size === 0) return;
  // broadcast current positions
  let positions = [];
  for (
    let playerIterator = players.values()
      , i = playerIterator.next()
    ; !i.done
    ; i = playerIterator.next()
  ) {
    positions.push(i.value);
  }
  io.emit('positionUpdate', positions);
}

let positionInterval = null;

io.on('connection', socket => {
  console.log('A user connected: ', socket.id);
  if (players.size === 0) positionInterval = setInterval(broadcastCurrentPositions, 30);

  socket.on('joined', position => {
    players.set(socket.id, {id: socket.id, position});
  });

  socket.on('movement', position => {
    players.set(socket.id, {id: socket.id, position});
  });

  socket.on('pause', _ => {
    players.delete(socket.id);
  });

  socket.on('disconnect', _ => {
    players.delete(socket.id);
    if (players.size === 0) clearInterval(positionInterval);
    console.log('A user disconnected');
  });
});
