import Controller from '../controller/controller';
import Painter from '../../utilities/painter/painter';

class Player {
  readonly FILL_COLOR = Painter.colorGenerator();
  readonly STROKE_COLOR = '#988';
  readonly SPEED = 1.25;
  readonly MOVEMENT_MULTIPLIER = 0.125;

  position: Coordinate;
  offset: Coordinate;
  size: Dimensions;
  painter: Painter;
  controller: Controller;

  movementDistance = 0;

  constructor (painter: Painter, offset: Coordinate) {
    this.position = {
      x: 0,
      y: 0
    };
    this.offset = offset;
    this.size = {
      width: 50,
      height: 50
    };
    this.painter = painter;
    this.controller = new Controller(this.position, this.offset, this.size);
  }

  update (deltaTs: number, offset: Coordinate) {
    // TODO: movementDistance {x, y}
    this.movementDistance =
        this.MOVEMENT_MULTIPLIER
      * this.SPEED
      * deltaTs;

    // recalibrate (window resize)
    this.controller.offset = offset;
    // move
    Object.values(this.controller.keys).forEach(({axis, directionFactor, state}: ControllerKeyState) => {
      if (state) this.position[axis] += directionFactor * this.movementDistance;
    });
  };

  draw () {
    // draw what has to be drawn
    this
      .painter
      .drawRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height,
        this.FILL_COLOR,
        this.STROKE_COLOR
      );
  };
}

export {
  Player as default
};
