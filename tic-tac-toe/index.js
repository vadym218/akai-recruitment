let turn = "x";
let symbols = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));

board.addEventListener("mouseup", ({ target }) => {
  const classes = Array.from(target.classList);
  if (classes.includes("tile") && classes.length !== 1) return;

  const idx = tiles.indexOf(target);

  target.classList.add(`tile-${turn}`);
  symbols[idx % 3][Math.floor(idx / 3)] = turn;
  checkWin();

  turn = turn === "x" ? "o" : "x";
  displayTurn(turn);
});

function displayTurn(turn) {
  document.querySelector(".turn").innerHTML = `${turn.toUpperCase()} turn`;
}

function reset() {
  displayTurn((turn = "x"));
  symbols = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  tiles.forEach((tile) => (tile.className = "tile"));
}
document.querySelector(".reset").addEventListener("click", reset);

function declareWin() {
  alert(`${turn.toUpperCase()} won!`);
  reset();
}

function checkWin() {
  const columnWin = symbols.some(
    (column) => column[0] === turn && column[1] === turn && column[2] === turn
  );
  if (columnWin) declareWin();

  let rowWin;
  for (i = 0; i < 3; i++) {
    if (
      symbols[0][i] === turn &&
      symbols[1][i] === turn &&
      symbols[2][i] === turn
    ) {
      rowWin = true;
      break;
    }
  }
  if (rowWin) declareWin();

  const diagonalWin =
    (symbols[0][0] === turn &&
      symbols[1][1] === turn &&
      symbols[2][2] === turn) ||
    (symbols[0][2] === turn &&
      symbols[1][1] === turn &&
      symbols[2][0] === turn);
  if (diagonalWin) declareWin();
}
