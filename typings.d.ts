interface Coordinate {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface GameBoardData {
  // TODO: resolve Painter - is now class
  painter: Painter;
  offset: Coordinate;
}

interface ServerPlayer {
  id: string,
  position: Coordinate
}