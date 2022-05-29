function SecondSquare(CELL_W, CELL_H){
  this.padding = 25

  this.init = () => {
    this.drawCell()

    push()
    translate(CELL_W, 0)
    this.drawKoch()
    pop()

  }

  this.drawCell = () => {
    fill('#abc123')
    rect(CELL_W,0, CELL_W, CELL_H)
  }

  this.drawKoch = () => {
    const padding = 20
    stroke('black')
    strokeWeight(2)

    line(padding, CELL_H/2, CELL_W - padding, CELL_H/2)
  }
}
