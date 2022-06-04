function NinthSquare(CELL_W, CELL_H) {

  this.input = null
  this.texts = []

  this.setup = () => {
    this.createInput()
    this.createEraseButton()
  }

  this.init = () => {
    this.drawCell()
    push()
    translate(CELL_W * 2, CELL_H * 2)
    this.drawTexts()
    pop()
  }

  this.createInput = () => {
    const inputPadding = 10
    const $input = document.createElement('input')
    $input.placeholder = 'Digite um texto e aperte enter'
    $input.style.width = `${CELL_W - inputPadding * 3}px`
    $input.style.position = 'absolute'
    $input.style.top = `${CELL_H * 2 + 10}px`
    $input.style.left = `${CELL_W * 2 + inputPadding}px`

    $input.addEventListener('keypress', this.textEventListener)

    this.input = $input
    document.body.append($input)
  }

  this.createEraseButton = () => {
    const $button = document.createElement('button')
    $button.innerText = 'Limpar'
    $button.style.position = 'absolute'
    $button.style.top = `${CELL_H * 3 - 30}px`
    $button.style.left = `${CELL_W * 2 + CELL_W /2 - 20}px`

    const _this = this
    $button.addEventListener('click', () => {
      _this.texts = []
    })

    document.body.append($button)
  }

  this.randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  this.textEventListener = keyboardEvent => {
    if(keyboardEvent.key !== 'Enter') return

    const screenPadding = 50
    const x = this.randomBetween(screenPadding, CELL_W - screenPadding)
    const y = this.randomBetween(screenPadding, CELL_H - screenPadding)

    this.texts.push({
      text: this.input.value,
      x,
      y
    })

    this.input.value = ''
  }

  this.drawTexts = () => {
    this.texts.map(textValue => {
      fill('white')
      textSize(20)
      text(textValue.text, textValue.x, textValue.y)
    })
  }

  this.drawCell = () => {
    fill('blue')
    rect(CELL_W * 2, CELL_H * 2, CELL_W, CELL_H)
  }
}
