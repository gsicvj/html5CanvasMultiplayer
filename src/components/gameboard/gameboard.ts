import Painter from '../../utilities/painter/painter';

class GameBoard {

  readonly GAME_BOARD_ID = 'jabba-the-hutt';
  readonly CLEAR_COLOR = '#fee';

  board: HTMLCanvasElement = null;
  size: Dimensions = null;
  position: Coordinate = null;

  context: CanvasRenderingContext2D = null;
  painter: Painter = null;

  clearColor: string = null;
  lastRenderTs = 0;
  gameOn = false;

  constructor (size: Dimensions) {
    this.size = size;
    this.board = this.html();
    this.context = this.board.getContext('2d');

    // Skip setting listeners, variables when browser's a monolith ...
    if (!this.context) return;

    this.painter = new Painter(this.context);

    // add event listeners
    window
      .addEventListener(
        'resize',
        this.handleResizeEvents.bind(this)
      );

    this.positionSelf();
  }

  html (): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', this.GAME_BOARD_ID);
    canvas.setAttribute('width', `${this.size.width}px`);
    canvas.setAttribute('height', `${this.size.height}px`);

    return canvas;
  }

  positionSelf () {
    const {
      top,
      left
    } = this
      .board
      .getBoundingClientRect();

    this.position = {
      x: left,
      y: top
    };
  }

  data (): GameBoardData {
    return {
      painter: this.painter,
      offset: {
        x: this.position.x,
        y: this.position.y
      }
    };
  }

  handleResizeEvents () {
    this.positionSelf();
  };

  draw () {
    this
      .painter
      .drawRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height,
        this.CLEAR_COLOR
      );
  }
}

export {
  GameBoard as default
};
