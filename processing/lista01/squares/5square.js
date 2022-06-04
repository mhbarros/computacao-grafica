/**
 * Again our moon trace, with some modifications.
 */
function FifthSquare() {

  this.setup = () => {
    fill('pink')
    rect(CELL_W, CELL_H, CELL_W, CELL_H)
  }

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
    const angleOfRotation = radians(frameCount * 20 / 2)
    fill('black')
    rotate(angleOfRotation)
    circle(-CELL_W/2 + 20,0,30)

    const rest = radians(Number((angleOfRotation % radians(360)).toFixed(1)))

    if(Number(rest.toPrecision(2)) === 0 || rest > 1) {
      this.drawCell()
    }
  }
}
