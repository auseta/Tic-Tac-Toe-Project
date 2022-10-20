const mainContainer = document.querySelector(".main");
const gameContainer = document.querySelector(".game");
const resultsContainer = document.querySelector(".results")
const playButton = document.querySelector("#play-button");
const inputX = document.querySelector("#player-x-name");
const inputO = document.querySelector("#player-o-name");
const resultsMessage = document.querySelector("#results-message");

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
  let boardIterations = 0;

  const winConditions = {
    winCombos: [
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],

    checkWin: function (column, playerMoves) {
      let win = column.every((mark) => playerMoves.includes(mark));
      return win;
    },
  };

  function victoryResult(player, enemy) {
    let victoryMessage = Math.round(Math.random() * 2 + 1);
    switch (victoryMessage) {
      case 1:
        resultsMessage.textContent = `This was a massacre, ${player.name} bluntly crushed Enemy.`;
        break;
      case 2:
        resultsMessage.textContent = `but what a battle, it seemed like a hopeless case but ${player.name} knew how to act calmly and achieved victory over ${enemy.name}`;
        break;
      case 3:
        resultsMessage.textContent = `It seems that ${enemy.name} did not know how to respond to ${player.name} clever moves. You should pay more attention next time`;
        break;
    }
  }

  function victory(player, element) {
    player.playerMoves.push(+element.id);
    const playerMoves = player.playerMoves;
    const checkWin = winConditions.checkWin;
    for (const column of winConditions.winCombos) {
      if (checkWin(column, playerMoves)) {
        return true;
      }
    }
  }

  function gameFlow(player, enemy) {
    let boardSpace = document.querySelectorAll(".board-element");
    boardSpace.forEach((space) => {
      space.onclick = function (e) {
        if (space.innerHTML === "") {
          boardIterations++;

          if (player.getTurn() && !enemy.getTurn()) {
            space.innerHTML = player.getMark();
            player.setTurn(false);
            enemy.setTurn(true);
            let playerVictory = victory(player, space);
            if (playerVictory) {
              gameContainer.style.display = "none"
              resultsContainer.style.display = "flex"
              victoryResult(player, enemy)
            } else if (
              !playerVictory &&
              !playerVictory &&
              boardIterations === 9
            ) {
              console.log("ES EMPATE");
            }
          } else if (!player.getTurn() && enemy.getTurn()) {
            space.innerHTML = enemy.getMark();
            player.setTurn(true);
            enemy.setTurn(false);
            let enemyVictory = victory(enemy, space);
            console.log(enemy.playerMoves);
            if (enemyVictory) {
              gameContainer.style.display = "none"
              resultsContainer.style.display = "flex"
              victoryResult(enemy, player)
            } else if (
              !enemyVictory &&
              !enemyVictory &&
              boardIterations === 9
            ) {
              console.log("ES EMPATE");
            }
          }
        }
      };
    });
  }

  function printBoard(player, enemy) {
    gameFlow(player, enemy);
  }

  return { printBoard };
})();

const PlayerFactory = (name, mark, turn) => {
  const playerMark = mark;
  let playerTurn = turn;
  const playerMoves = [];
  const getMark = () => playerMark;
  const getTurn = () => playerTurn;
  const setTurn = (newTurn) => (playerTurn = newTurn);
  return { name, getMark, getTurn, setTurn, playerMoves };
};

playButton.onclick = function () {
  if (inputX.value && inputO.value) {
    let playerX = PlayerFactory(inputX.value, "X", true);
    let playerO = PlayerFactory(inputO.value, "O", false);
    gameboard.render();
    game.printBoard(playerX, playerO);
  }
};