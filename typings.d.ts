interface Coordinate {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface GameBoardData {
  painter: Painter;
  offset: Coordinate;
}
