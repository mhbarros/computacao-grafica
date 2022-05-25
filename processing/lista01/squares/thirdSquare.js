function ThirdSquare(){

  this.init = () => {
    this.drawCell()
  }

  this.drawCell = () => {
    fill('green')
    rect(600,0,CELL_W,CELL_H)
  }
}
