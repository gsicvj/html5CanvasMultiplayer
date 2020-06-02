import GameBoard from '../../components/gameboard/gameboard';
import Player from '../../components/player/player';

let SOCKET_UPDATE_MILLIS = 100;
let stopMain: number = null;
let player: Player = null;
let gameBoard: GameBoard = null;
let previousTs = 0;
let sendPositionTimer: number = 0;
let socket: SocketIOClient.Socket = null;

const main = (frameTs: number) => {
  stopMain = window.requestAnimationFrame(main);
  let deltaTs = frameTs - previousTs;

  update(deltaTs);
  draw();

  previousTs = frameTs;
}

const update = (deltaTs: number) => {
  player.update(deltaTs, gameBoard.position);
}

const draw = () => {
  gameBoard.draw();
  player.draw();
}

const start = (appId: string, _socket: SocketIOClient.Socket) => {
  socket = _socket;

  socket.on('positionUpdate', (serverPlayers: ServerPlayer[]) => {
    if (stopMain === null) return;

    // TODO: move the id to initialisation phase - set only once
    gameBoard.update(socket.id, serverPlayers);

    socket.emit('movement', player.position);
  });

  sendPositionTimer = 0;

  if (stopMain !== null) {
    console.log('Already running.');
    return;
  }
  gameBoard = new GameBoard({width: 300, height: 300});
  document.getElementById(appId).prepend(gameBoard.board);

  if (!gameBoard.context) {
    console.error('Your browser doesn\'t support HTML5 Canvas.');
    return;
  }

  const {painter, offset} = gameBoard.data();
  player = new Player(painter, offset);
  // define initial movement
  socket.emit('joined', player.position);

  main(performance.now());
}

const stop = () => {
  window.cancelAnimationFrame(stopMain);
  stopMain = null;
  gameBoard.board.remove();
  socket.emit('pause');
}

export {
  start,
  stop
}