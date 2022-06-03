/**
 * Represents a single line into Koch
 */
function KochLine() {
  let start, end

  /**
   * @param {p5.Vector} vectorX the p5.vector start, created by createVector()
   * @param {p5.Vector} vectorY the p5.vector end, created by createVector()
   */
  this.init = (vectorX, vectorY) => {
    start = vectorX.copy()
    end = vectorY.copy()

    return this
  }

  /**
   * @param {string} lineColor - The color of the line
   * @param {number} lineWeight - The weight of the line
   */
  this.display = (lineColor = '#000', lineWeight = 1) => {
    stroke(lineColor)
    strokeWeight(lineWeight)
    line(start.x, start.y, end.x, end.y)
  }

  /**
   *
   * @returns {p5.Vector} - The vector of segment A
   */
  this.segmentA = () => {
    return start.copy()
  }

  /**
   *
   * @returns {p5.Vector} - The vector of segment B (1/3 of the way)
   */
  this.segmentB = () => {
    let vectorB = p5.Vector.sub(end, start);
    vectorB.div(3); // 1/3
    vectorB.add(start);

    return vectorB;
  }


  /**
   * @returns {p5.Vector} - The vector C
   */
  this.segmentC = () => {
    let startC = start.copy();
    let endMinusStart = p5.Vector.sub(end, start);

    endMinusStart.div(3);
    startC.add(endMinusStart);

    endMinusStart.rotate(-PI/3);
    startC.add(endMinusStart);

    return startC;
  }

  /**
   *
   * @returns {p5.Vector} - The vector D
   */
  this.segmentD = () => {
    let vectorD = p5.Vector.sub(end, start);
    vectorD.mult(2/3);
    vectorD.add(start);

    return vectorD;
  }

  /**
   *
   * @returns {p5.Vector} - The vector E
   */
  this.segmentE = () => {
    return end.copy()
  }
}

/**
 * Function to draw a Koch Fractal
 */
function KochFractal() {
  /**
   * @type {KochLine[]} Array of vectors from fractal
   */
  let lines = []

  /**
   * @type {number} Amount of current lines on fractal
   */
  let amountOfLines = 0

  /**
   * @type {p5.Vector|undefined} The start of the fractal
   */
  this.start = undefined

  /**
   * @type {p5.Vector|undefined} The end of the fractal
   */
  this.end   = undefined

  /**
   *
   * @param {p5.Vector} start
   * @param {p5.Vector} end
   */
  this.init = (start, end) => {
    this.start = start
    this.end   = end
    this.restart()
  }

  /**
   * Restarts the koch fractal to a single line
   */
  this.restart = () => {
    amountOfLines = 0
    lines = []

    lines.push(new KochLine().init(this.start, this.end))
  }

  /**
   * Render all the lines
   */
  this.render = () => {
    for(let i = 0; i < lines.length; i++) {
      lines[i].display();
    }
  }

  /**
   * Draws another level of the koch fractal
   */
  this.nextLevel = () => {
    lines = this.iterate()
    amountOfLines+=1
  }

  /**
   * Creates new segments for the fractal and replace the current ones
   * @returns {KochLine[]} - The list of lines currently present on the fractal
   */
  this.iterate = () => {
    let newFractal = [];
    for(let i = 0; i < lines.length; i++) {
      let currentLine = lines[i];

      let a = currentLine.segmentA();
      let b = currentLine.segmentB();
      let c = currentLine.segmentC();
      let d = currentLine.segmentD();
      let e = currentLine.segmentE();

      newFractal.push(new KochLine().init(a,b));
      newFractal.push(new KochLine().init(b,c));
      newFractal.push(new KochLine().init(c,d));
      newFractal.push(new KochLine().init(d,e));
    }

    return newFractal;
  }

  /**
   * @returns {number} - Number of lines on fractal
   */
  this.getAmountOfLines = () => {
    return amountOfLines
  }
}

function SecondSquare(CELL_W, CELL_H){
  this.padding = 25
  this.Koch = new KochFractal()

  this.setup = () => {
    const vectorStart = createVector(this.padding,CELL_H/2)
    const vectorEnd   = createVector(CELL_W - this.padding, CELL_H / 2)

    this.Koch.init(vectorStart, vectorEnd)
  }

  this.init = () => {
    this.drawCell()

    push()
    translate(CELL_W, 0)
    this.drawCircle()
    this.drawTriangle()
    this.drawKoch()
    pop()

  }

  this.drawCircle = () => {
    push()
    translate(CELL_W/2, CELL_H/2)
    circle(0,0,CELL_W)
    pop()
  }

  this.drawTriangle = () => {
    push()
    translate(CELL_W/2, CELL_H/2)

    const circleRadius = CELL_W/2
    const side = circleRadius * Math.sqrt(3)
    const apoth = circleRadius / 2
    const theta = 60

    strokeWeight(10)
    point(0, -CELL_H/2)

    

    pop()
  }

  this.drawCell = (cellColor = '#abc123') => {
    fill(cellColor)
    rect(CELL_W,0, CELL_W, CELL_H)
  }

  this.drawKoch = () => {
    const canUpdateKoch = frameCount % (2 * FRAMERATE) === 0

    this.Koch.render()

    if(!canUpdateKoch) return
    this.Koch.nextLevel()

    if(this.Koch.getAmountOfLines() > 5) {
      this.Koch.restart()
    }
  }
}
