const CANVAS_W = 900
const CANVAS_H = 900

const CELL_W = 300
const CELL_H = 300

const FRAMERATE = 60

const firstSquare = new FirstSquare(CELL_W, CELL_H)
const secondSquare = new SecondSquare(CELL_W, CELL_H)
const thirdSquare = new ThirdSquare()

function setup() {
  createCanvas(CANVAS_W, CANVAS_H)
  frameRate(FRAMERATE)
}


function draw() {
  drawDivisions()

  firstSquare.init()
  secondSquare.init()
  thirdSquare.init()
}


const drawDivisions = () => {

  // Second line
  fill('purple')
  rect(0,300,CELL_W,CELL_H)
  fill('pink')
  rect(300,300,CELL_W,CELL_H)
  fill('white')
  rect(600,300,CELL_W,CELL_H)

  // Third line
  fill('brown')
  rect(0,600,CELL_W,CELL_H)
  fill('gray')
  rect(300,600,CELL_W,CELL_H)
  fill('orange')
  rect(600,600,CELL_W,CELL_H)
}
