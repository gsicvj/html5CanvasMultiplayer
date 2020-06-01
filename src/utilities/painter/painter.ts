class Painter {

  context: CanvasRenderingContext2D = null;

  constructor (context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawRect (
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    strokeColor?: string) {

    this.context.fillStyle = fillColor;
    this.context.fillRect(x, y, width, height);

    if (strokeColor) {
      this.context.strokeStyle = strokeColor;
      this.context.strokeRect(x, y, width, height);
    }
  };
}

export {
  Painter as default
}