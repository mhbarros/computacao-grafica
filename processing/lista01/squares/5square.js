function FifthSquare() {
  this.init = () => {
    push()

    translate(CELL_W, CELL_H)
    translate(CELL_W/2, CELL_H/2)
    this.drawMoon()
    pop()
  }

  this.drawCell = () => {
    fill('pink')
    rect(-CELL_W/2,-CELL_H/2,CELL_W, CELL_H)
  }

  this.drawMoon = () => {
    const angleOfRotation = radians(frameCount) * 20 / 2
    fill('black')
    rotate(angleOfRotation)
    circle(-CELL_W/2 + 20,0,30)

    if(angleOfRotation % radians(360) === 0) {
      this.drawCell()
    }
  }
}
