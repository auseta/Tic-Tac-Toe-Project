const mainContainer = document.querySelector(".main");
const gameContainer = document.querySelector(".game");
const playButton = document.querySelector("#play-button");
const inputX = document.querySelector("#player-x-name");
const inputO = document.querySelector("#player-o-name");

const gameboard = (function () {
  const gameboard = {
    board: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  };

  function addSpaceClass(element) {
    switch (element.getAttribute("id")) {
      case "1":
        element.classList.add("left-space", "board-element");
        break;
      case "2":
        element.classList.add("middle-space", "board-element");
        break;
      case "3":
        element.classList.add("right-space", "board-element");
        break;
      case "4":
        element.classList.add("left-space", "board-element");
        break;
      case "5":
        element.classList.add("middle-space", "board-element");
        break;
      case "6":
        element.classList.add("right-space", "board-element");
        break;
      case "7":
        element.classList.add("left-space", "board-element");
        break;
      case "8":
        element.classList.add("middle-space", "board-element");
        break;
      case "9":
        element.classList.add("right-space", "board-element");
        break;
    }
  }

  function createElement() {
    for (const column of gameboard.board) {
      for (let space of column) {
        const boardElement = document.createElement("div");
        boardElement.id = space;
        addSpaceClass(boardElement);
        mainContainer.style.display = "none";
        gameContainer.style.display = "grid";
        gameContainer.appendChild(boardElement);
      }
    }
  }

  function render() {
    createElement();
  }

  return { render };
})();

const game = (function () {
  function printConditions(player, enemy) {
    let boardSpace = document.querySelectorAll(".board-element");
    boardSpace.forEach((space) => {
      space.onclick = function (e) {
        if (player.getTurn() && !enemy.getTurn()) {
          space.innerHTML = player.getMark();
          player.setTurn(false);
          enemy.setTurn(true);
        } else if (!player.getTurn() && enemy.getTurn()) {
          space.innerHTML = enemy.getMark();
          player.setTurn(true);
          enemy.setTurn(false);
        }
      };
    });
  }

  function printBoard(player, enemy) {
    printConditions(player, enemy);
  }

  return { printBoard };
})();

const PlayerFactory = (name, mark, turn) => {
  const playerMark = mark;
  let playerTurn = turn;
  const getMark = () => playerMark;
  const getTurn = () => playerTurn;
  const setTurn = (newTurn) => (playerTurn = newTurn);
  return { name, getMark, getTurn, setTurn };
};

playButton.onclick = function () {
  if (inputX.value && inputO.value) {
    let playerX = PlayerFactory(inputX.value, "X", true);
    let playerO = PlayerFactory(inputO.value, "O", false);
    gameboard.render();
    game.printBoard(playerX, playerO);
  }
};
