function FourthSquare(CELL_W, CELL_H, FRAMERATE) {

  this.init = () => {
    push()
    translate(0, CELL_H)
    translate(CELL_W/2, CELL_H/2)

    this.drawMoon()

    pop()

  }

  this.drawCell = () => {
    fill('white')
    rect(-CELL_W/2, -CELL_H/2, CELL_W, CELL_H)
  }

  this.drawMoon = () => {
    fill('black')
    rotate(radians(frameCount) * 6 / 2)
    circle(-40,-40,10)

    if(radians(frameCount) * 6 / 2 % radians(360) === 0) {
      this.drawCell()
    }
  }
}
