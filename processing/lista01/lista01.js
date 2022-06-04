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
const sixthSquare = new SixthSquare(CELL_W, CELL_H, FRAMERATE)
const seventhSquare = new SeventhSquare(CELL_W, CELL_H, FRAMERATE)
const eighthSquare = new EighthSquare(CELL_W, CELL_H, FRAMERATE)
const ninthSquare = new NinthSquare(CELL_W, CELL_H, FRAMERATE)

function setup() {
  createCanvas(CANVAS_W, CANVAS_H)
  frameRate(FRAMERATE)

  secondSquare.setup()
  fifthSquare.setup()
  eighthSquare.setup()
  ninthSquare.setup()
}


function draw() {
  firstSquare.init()
  secondSquare.init()
  thirdSquare.init()
  fourthSquare.init()
  fifthSquare.init()
  sixthSquare.init()
  seventhSquare.init()
  eighthSquare.init()
  ninthSquare.init()
}

function keyPressed() {
  eighthSquare.keyPressed()
}
