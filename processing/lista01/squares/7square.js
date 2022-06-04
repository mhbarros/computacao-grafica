/**
 * Silence is golden..
 */
function SeventhSquare() {
  this.init = () => {
    this.drawCell()
  }

  this.drawCell = () => {
    fill('brown')
    rect(0, CELL_H * 2, CELL_W, CELL_H)
  }
}
