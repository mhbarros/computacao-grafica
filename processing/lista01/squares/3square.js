function ThirdSquare(CELL_w, CELL_H, FRAMERATE){

  this.angle = 0

  this.init = () => {
    this.drawCell()

    push()
    translate(CELL_W * 2, 0)
    translate(CELL_W/2, CELL_H/2)

    this.drawSun()
    this.drawEarth(20)
    this.drawMoon(5)

    pop()
  }

  this.drawCell = () => {
    fill('#220439')
    rect(CELL_W * 2,0,CELL_W,CELL_H)
  }

  this.drawSun = () => {

    fill('#ffdf00')
    noStroke()
    circle(0, 0, 80)
  }

  this.drawMoon = (secondsToRotate) => {
    translate(-70,-70)
    fill('white')
    rotate(radians(frameCount) * 6 / secondsToRotate)
    circle(-20,-20,10)
  }

  this.drawEarth = (secondsToRotate) => {
    rotate(radians(frameCount) * 6 / secondsToRotate)
    fill('blue')
    circle(-70, -70, 20)
  }
}
