class Painter {

  context: CanvasRenderingContext2D = null;

  constructor (context: CanvasRenderingContext2D) {
    this.context = context;
  }

  static colorGenerator (): string {
    const chars = Array.from('0123456789abcdef');
    let color = '#';
    for (let i = 0; i < 3; i ++) {
      color += chars[Math.floor(Math.random()*16)];
    }
    return color;
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