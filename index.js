const gameBoard = (function(){

  let board = [
    ["div", "div", "div"],
    ["div", "div", "div"],
    ["div", "div", "div"]
  ]

  let id = 0;

  let elementOfTheBoard;

  const appendElementToBoard = (element) => {
    document.querySelector(".game-board").appendChild(element)
  }

  const styleBoardSpaces = (element) => {
    switch (element.id) {
      case "0" :
        element.classList.add("left-space", "board-element")
        break;
      case "1":
        element.classList.add("middle-space", "board-element")
        break;
      case "2" :
        element.classList.add("right-space", "board-element")
        break;
      case "3" :
        element.classList.add("left-space", "board-element")
        break;
      case "4":
        element.classList.add("middle-space", "board-element")
        break;
      case "5":
        element.classList.add("right-space","board-element");
        break
      case "6" :
        element.classList.add("left-space", "board-element")
        break;
      case "7" :
        element.classList.add("middle-space", "board-element")
        break;
      case "8": 
      element.classList.add("right-space", "board-element")
      break;
    }
  }

  const createGameBoard = () => {
    for (const column of board) {
      for (const element of column) {
        elementOfTheBoard = document.createElement(element)
        elementOfTheBoard.setAttribute("id", id)
        appendElementToBoard(elementOfTheBoard)
        styleBoardSpaces(elementOfTheBoard)
        id++
      }
    }
  }
  return { createGameBoard }
})()

gameBoard.createGameBoard()