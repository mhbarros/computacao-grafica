/**
 * Renders a line based on its parametric equations
 */
function SixthSquare(CELL_W, CELL_H) {
  this.u = FRAMERATE

  this.init = () => {
    this.drawCell()
    push()
    translate(CELL_W*2 + CELL_W/2, CELL_H + CELL_H /2)

    beginShape()
    for (let i = 0; i < 20; ++i) {
      const xParam = (frameCount % 70 * i) / 200;
      const yParam = (frameCount % 70 * i) / 200;

      vertex(this.x(xParam) * 30, this.y(yParam) * 30);
    }

    endShape()
    pop()
  }

  this.drawCell = () => {
    fill('green')
    rect(CELL_W * 2, CELL_H, CELL_W, CELL_H)
  }

  this.x = (u) => {
    return cos(u) * (exp(cos(u)) - 2 * cos(4 * u) - pow(sin(u / 12), 5));
  }

  this.y = (u) => {
    return sin(u) * (exp(cos(u)) - 2 * cos(4 * u) - pow(sin(u / 12), 5));
  }
}
