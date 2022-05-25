function SecondSquare(CELL_W, CELL_H){
  this.padding = 25

  this.init = () => {
    this.drawCell()

    push()
    translate(CELL_W, 0)

    stroke('black')
    const x1 = this.padding
    const y1 = CELL_H / 2
    const x2 = CELL_W - this.padding
    const y2 = CELL_H / 2

    line(x1, y1, x2, y2)

    stroke('red')
    strokeWeight(10)


    point(((2 * x1) + x2) / 3, ((2 * y1) + y2) / 3)
    point((x1 + (x2 * 2)) / 3, ((2 * y1) + y2) / 3)

    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2

    const deltay = x2 - x1
    const deltax = y2 - y1

    const fator = Math.sqrt(3) / 6

    const sx = mx + (fator * deltay)
    const sy = my + (fator * deltax)

    point(sx, sy)

    // Reset stroke
    stroke('black')
    strokeWeight(1)

    pop()
  }

  this.drawCell = () => {
    fill('#abc123')
    rect(300,0, CELL_W, CELL_H)
  }
}
