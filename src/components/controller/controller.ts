class Controller {
  readonly keyMap: ControllerKeyMap = {
    38: 'up',
    39: 'right',
    40: 'down',
    37: 'left',
    27: 'escape',
    32: 'space'
  }

  keys: ControllerKeys = {
    up: {
      state: false,
      directionFactor: -1,
      axis: 'y'
    },
    right: {
      state: false,
      directionFactor: 1,
      axis: 'x'
    },
    down: {
      state: false,
      directionFactor: 1,
      axis: 'y'
    },
    left: {
      state: false,
      directionFactor: -1,
      axis: 'x'
    }
  }

  position: Coordinate;
  offset: Coordinate;
  size: Dimensions;
  constructor (position: Coordinate, offset: Coordinate, size: Dimensions) {
    this.position = position;
    this.offset = offset;
    this.size = size;

    // add event listeners
    document
      .addEventListener(
        'mouseup',
        this.handleClickEvents.bind(this)
      );

    document
      .addEventListener(
        'keydown',
        this.handleKeyDownEvents.bind(this)
      );

    document
      .addEventListener(
        'keyup',
        this.handleKeyUpEvents.bind(this)
      );
  }

  handleClickEvents ({clientX, clientY}: MouseEvent) {
    this.position.x = clientX
      - this.offset.x
      - this.size.width * 0.5;

    this.position.y = clientY
      - this.offset.y
      - this.size.height * 0.5;
  };

  handleKeyDownEvents ({keyCode}: KeyboardEvent) {
    const keyPressed = this.keyMap[keyCode];

    if (this.keys[keyPressed]) this.keys[keyPressed].state = true;
  };

  handleKeyUpEvents ({keyCode}: KeyboardEvent) {
    const keyPressed = this.keyMap[keyCode];

    Object.keys(this.keys).forEach(key => {
      if (key !== keyPressed) this.keys[key].state = false;
    });
  };
}

export {
  Controller as default
}
