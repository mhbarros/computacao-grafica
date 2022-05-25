function FirstSquare(CELL_W, CELL_H){

  this.numberOfVertices = 3

  this.init = () => {
    push()

    this.drawCell()

    const radius = CELL_W * 0.2

    translate(CELL_W / 2, CELL_H / 2)
    // circle(0, 0, radius * 2) // circle uses diameter
    fill(200, 34, 93);

    noStroke();
    beginShape()

    this.updateNumberOfVertices()

    for(let i = 0; i < this.numberOfVertices; i++){
      const vertex_x = radius * Math.cos(i * (-TWO_PI/this.numberOfVertices))
      const vertex_y = radius * Math.sin(i * (-TWO_PI/this.numberOfVertices))

      vertex(vertex_x, vertex_y)
    }

    endShape();
    pop()
  }

  this.drawCell = () => {
    fill(200)
    rect(0, 0, CELL_W, CELL_H)
  }

  this.updateNumberOfVertices = () => {
    const canUpdateVertices = frameCount % (2 * FRAMERATE) === 0

    if(!canUpdateVertices) {
      return
    }

    if(this.numberOfVertices === 12) {
      this.numberOfVertices = 3
      return
    }

    this.numberOfVertices+=1
  }
}
