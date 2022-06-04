/**
 * Our moon trace, taking 6 seconds to complete.
 */
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
    const angle = radians(frameCount) * 6 / 2
    fill('black')
    rotate(angle)
    circle(-40,-40,10)

    if(Number((angle % radians(360)).toFixed(1)) === 0) {
      this.drawCell()
    }
  }
}
