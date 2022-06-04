/**
 * A Simple Snake Game
 */
function EighthSquare(CELL_W, CELL_H){
  this.numSegments = 5

  this.x = []
  this.y = []

  this.fruits = []
  this.fruitSize = 20

  this.diff = 5

  this.startX = 10
  this.startY = CELL_H / 2
  this.direction = 'right'

  this.setup = () => {
    for (let i = 0; i < this.numSegments; i++) {
      this.x.push(this.startX + i * this.diff);
      this.y.push(this.startY);
    }
  }

  this.init = () => {
    this.drawCell()

    push()
    translate(CELL_W, CELL_H * 2)
    this.drawScore()
    this.drawSnake()
    this.moveSnake()
    this.generateFruits()
    this.drawFruits()
    this.checkSnakeCollision()
    pop()
  }

  this.drawScore = () => {
    fill(0)
    text(`Score: ${this.numSegments - 5}`, CELL_W/2 - 25, 20)
  }

  this.generateFruits = () => {
    const canGenerateFruit = frameCount % (FRAMERATE) === 0
    if(canGenerateFruit) {
      let x = Math.round(Math.random() * (CELL_W) / this.diff) * this.diff
      let y = Math.round(Math.random() * (CELL_H) / this.diff) * this.diff

      this.fruits.push([x,y])
    }
  }

  this.drawFruits = () => {
    this.fruits.forEach(([x,y]) => {
      strokeWeight(this.fruitSize)
      point(x, y)
      strokeWeight(1)
    })

  }

  this.drawSnake = () => {
    stroke(0);
    strokeWeight(10);
    for (let i = 0; i < this.numSegments - 1; i++) {
      line(this.x[i], this.y[i], this.x[i + 1], this.y[i + 1]);
    }
    stroke(0)
    strokeWeight(1)
  }

  this.moveSnake = () => {
    for (let i = 0; i < this.numSegments - 1; i++) {
      this.x[i] = this.x[i + 1];
      this.y[i] = this.y[i + 1];
    }

    switch (this.direction) {
      case 'right':
        this.x[this.numSegments - 1] = this.x[this.numSegments - 2] + this.diff;
        this.y[this.numSegments - 1] = this.y[this.numSegments - 2];
        break;
      case 'up':
        this.x[this.numSegments - 1] = this.x[this.numSegments - 2];
        this.y[this.numSegments - 1] = this.y[this.numSegments - 2] - this.diff;
        break;
      case 'left':
        this.x[this.numSegments - 1] = this.x[this.numSegments - 2] - this.diff;
        this.y[this.numSegments - 1] = this.y[this.numSegments - 2];
        break;
      case 'down':
        this.x[this.numSegments - 1] = this.x[this.numSegments - 2];
        this.y[this.numSegments - 1] = this.y[this.numSegments - 2] + this.diff;
        break;
    }

    this.limitSnake()
  }

  this.limitSnake = () => {
    if(this.x[this.x.length - 1] >= CELL_W) {
      this.x = Array(this.numSegments).fill(this.diff)
    }

    if(this.x[this.x.length - 1] <= 0) {
      this.x = Array(this.numSegments).fill(CELL_W - this.diff)
    }

    if(this.y[this.y.length - 1] >= CELL_H) {
      this.y = Array(this.numSegments).fill(this.diff)
    }

    if(this.y[this.x.length - 1] <= 0) {
      this.y = Array(this.numSegments).fill(CELL_H - this.diff)
    }
  }

  this.checkSnakeCollision = () => {
    const snakeHeadX = this.x[this.x.length - 1]
    const snakeHeadY = this.y[this.y.length - 1]


    this.fruits.forEach((fruit, index) => {
      const fruitX = fruit[0]
      const fruitY = fruit[1]

      const limit1x = fruitX - this.fruitSize
      const limit2x = fruitX + this.fruitSize

      const limit1y = fruitY - this.fruitSize
      const limit2y = fruitY + this.fruitSize

      if(snakeHeadX >= limit1x && snakeHeadX <= limit2x
          && snakeHeadY >= limit1y && snakeHeadY <= limit2y) {

        this.fruits.splice(index, 1)
        this.x[this.x.length] = this.x[this.x.length-1]
        this.y[this.y.length] = this.y[this.y.length-1]
        this.numSegments+=1
      }
    })
  }

  this.drawCell = () => {
    fill('red')
    rect(CELL_W, CELL_H * 2, CELL_W, CELL_H)
  }

  this.keyPressed = () => {
    switch (keyCode) {
      case 65:
        if (this.direction !== 'right') {
          this.direction = 'left';
        }
        break;
      case 68:
        if (this.direction !== 'left') {
          this.direction = 'right';
        }
        break;
      case 87:
        if (this.direction !== 'down') {
          this.direction = 'up';
        }
        break;
      case 83:
        if (this.direction !== 'up') {
          this.direction = 'down';
        }
        break;
    }
  }
}
