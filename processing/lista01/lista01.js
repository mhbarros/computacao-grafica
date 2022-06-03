const CANVAS_W = 900
const CANVAS_H = 900

const CELL_W = 300
const CELL_H = 300

const FRAMERATE = 30

const firstSquare = new FirstSquare(CELL_W, CELL_H)
const secondSquare = new SecondSquare(CELL_W, CELL_H)
const thirdSquare = new ThirdSquare(CELL_W, CELL_H, FRAMERATE)
const fourthSquare = new FourthSquare(CELL_W, CELL_H, FRAMERATE)
const fifthSquare = new FifthSquare(CELL_W, CELL_H, FRAMERATE)

function setup() {
  createCanvas(CANVAS_W, CANVAS_H)
  frameRate(FRAMERATE)

  secondSquare.setup()
}


function draw() {
  drawDivisions()

  firstSquare.init()
  secondSquare.init()
  thirdSquare.init()
  fourthSquare.init()
  fifthSquare.init()
}


const drawDivisions = () => {

  // Second line
  // fill('purple')
  // rect(0,300,CELL_W,CELL_H)
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
