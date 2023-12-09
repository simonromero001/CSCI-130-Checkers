class Piece {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    compare(piece) {
        return piece.row === this.row && piece.column === this.column;
    }
}

const modal = document.getElementById("easyModal");
let game = document.getElementById("game");
let currentPlayer = -1;
let posNewPosition = [];
let capturedPosition = [];
let readyToMove = null;
let player1Color = 'black';
let player2Color = 'white';

let board = [
    [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];

let boardTextures = ["url('https://st.depositphotos.com/1176848/1409/i/950/depositphotos_14093520-stock-photo-light-woodgrain-texture.jpg')", "url('https://www.onairdesign.com/cdn/shop/products/OA-139_Light_Wood_Texture_Board_LIGHTWOODTEXTUREBOARD_92958557-d376-4374-bccf-cd1a7b73a5bc_960x.jpg?v=1686262121')",
"url('https://live.staticflickr.com/3086/2705644192_7421d4a9ef_b.jpg')", "url('https://t4.ftcdn.net/jpg/03/69/25/05/360_F_369250586_z5HZqoztht4SIMRycXGNsVoELLLKrpjg.jpg')"];

var timerElement = document.getElementById('timer');

// Get the start time when the page loads
var startTime = new Date().getTime();

// Update the timer every second
setInterval(updateTimer, 1000);

function updateTimer() {
    // Get the current time
    var currentTime = new Date().getTime();

    // Calculate the time difference
    var elapsedTime = Math.floor((currentTime - startTime) / 1000);

    // Update the timer element
    timerElement.textContent = "Time: " + elapsedTime + " seconds";
}

function movePiece(e) {
    let piece = e.target;
    const row = parseInt(piece.getAttribute("row"));
    const column = parseInt(piece.getAttribute("column"));
    let p = new Piece(row, column);

    if (capturedPosition.length > 0) {
        enableToCapture(p);
    } else {
        if (posNewPosition.length > 0) {
            enableToMove(p);
        }
    }

    if (currentPlayer === board[row][column]) {
        player = reverse(currentPlayer);
        if (!findPieceCaptured(p, player)) {
            findPossibleNewPosition(p, player);
        }
    }
}

function enableToCapture(p) {
    let find = false;
    let pos = null;
    let old = null; // Added missing declaration
    capturedPosition.forEach((element) => {
        if (element.newPosition.compare(p)) {
            find = true;
            pos = element.newPosition;
            old = element.pieceCaptured;
            return;
        }
    });

    if (find) {
        // if the current piece can move on, edit the board and rebuild
        board[pos.row][pos.column] = currentPlayer; // move the piece
        board[readyToMove.row][readyToMove.column] = 0; // delete the old position
        // delete the piece that had been captured
        board[old.row][old.column] = 0;

        // reinit ready to move value
        readyToMove = null;
        capturedPosition = [];
        posNewPosition = [];
        builBoard();
        // check if there are possibilities to capture other pieces
        currentPlayer = reverse(currentPlayer);
    } else {
        builBoard();
    }
}

function enableToMove(p) {
    let find = false;
    let newPosition = null;
    // check if the case where the player plays the selected piece can move on
    posNewPosition.forEach((element) => {
        if (element.compare(p)) {
            find = true;
            newPosition = element;
            return;
        }
    });

    if (find) moveThePiece(newPosition);
    else builBoard();
}

function moveThePiece(newPosition) {
    // if the current piece can move on, edit the board and rebuild
    board[newPosition.row][newPosition.column] = currentPlayer;
    board[readyToMove.row][readyToMove.column] = 0;

    // init value
    readyToMove = null;
    posNewPosition = [];
    capturedPosition = [];

    currentPlayer = reverse(currentPlayer);

    builBoard();
}

function findPossibleNewPosition(piece, player) {
    const newRow = piece.row + player;

    if (newRow >= 0 && newRow < board.length) {
        if (board[newRow][piece.column + 1] === 0) {
            readyToMove = piece;
            markPossiblePosition(piece, player, 1);
        }

        if (board[newRow][piece.column - 1] === 0) {
            readyToMove = piece;
            markPossiblePosition(piece, player, -1);
        }
    }
}

function markPossiblePosition(p, player = 0, direction = 0) {
    attribute = parseInt(p.row + player) + "-" + parseInt(p.column + direction);

    position = document.querySelector("[data-position='" + attribute + "']");
    if (position) {
        position.style.background = "yellow";
        // save where it can move
        posNewPosition.push(new Piece(p.row + player, p.column + direction));
    }
}

function builBoard() {
    game.innerHTML = "";
    let black = 0;
    let white = 0;

    let table = document.createElement("table");
    table.setAttribute("class", "chessboard");

    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        let row = document.createElement("tr"); // create div for each row
        row.setAttribute("class", "row");

        for (let j = 0; j < element.length; j++) {
            const elmt = element[j];
            let col = document.createElement("td"); // create div for each case
            let piece = document.createElement("div");
            let caseType = "";
            let occupied = "";

            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    caseType = "Whitecase";
                } else {
                    caseType = "blackCase";
                }
            } else {
                if (j % 2 !== 0) {
                    caseType = "Whitecase";
                } else {
                    caseType = "blackCase";
                }
            }

            // add the piece if the case isn't empty
            if (board[i][j] === 1) {
                occupied = "whitePiece";
                piece.style.backgroundColor = player2Color; // Set the color here
            } else if (board[i][j] === -1) {
                occupied = "blackPiece";
                piece.style.backgroundColor = player1Color; // Set the color here
            } else {
                occupied = "empty";
            }

            piece.setAttribute("class", "occupied " + occupied);

            // set row and column in the case
            piece.setAttribute("row", i);
            piece.setAttribute("column", j);
            piece.setAttribute("data-position", i + "-" + j);

            // add event listener to each piece
            piece.addEventListener("click", movePiece);

            col.appendChild(piece);
            col.setAttribute("class", "column " + caseType);
            row.appendChild(col);

            // counter number of each piece
            if (board[i][j] === -1) {
                black++;
            } else if (board[i][j] === 1) {
                white++;
            }
        }

        game.appendChild(row);
    }

    const piecesCount = getPiecesCount();

    if (piecesCount.black > piecesCount.white){
        document.getElementById("blackPiecesCount").textContent = `Currently Winning: Black: ${piecesCount.black}`;
        document.getElementById("whitePiecesCount").textContent = `White Pieces: ${piecesCount.white}`;
    }
    else if (piecesCount.black < piecesCount.white){
        document.getElementById("blackPiecesCount").textContent = `Black Pieces: ${piecesCount.black}`;
        document.getElementById("whitePiecesCount").textContent = `Currently Winning: White Pieces: ${piecesCount.white}`;
    }
    else{
        document.getElementById("blackPiecesCount").textContent = `Black Pieces: ${piecesCount.black}`;
        document.getElementById("whitePiecesCount").textContent = `White Pieces: ${piecesCount.white}`;
    }

    if (black === 0 || white === 0) {
        checkWinner();
    }
}

function findPieceCaptured(p, player) {
    let found = false;
    if (
        p.row - 2 >= 0 && p.column - 2 >= 0 &&
        board[p.row - 1][p.column - 1] === player &&
        board[p.row - 2][p.column - 2] === 0
    ) {
        found = true;
        newPosition = new Piece(p.row - 2, p.column - 2);
        readyToMove = p;
        markPossiblePosition(newPosition);
        // save the new position and the opponent's piece position
        capturedPosition.push({
            newPosition: newPosition,
            pieceCaptured: new Piece(p.row - 1, p.column - 1),
        });
    }

    if (
        p.row - 2 >= 0 && p.column + 2 < board[0].length &&
        board[p.row - 1][p.column + 1] === player &&
        board[p.row - 2][p.column + 2] === 0
    ) {
        found = true;
        newPosition = new Piece(p.row - 2, p.column + 2);
        readyToMove = p;
        markPossiblePosition(newPosition);
        // save the new position and the opponent's piece position
        capturedPosition.push({
            newPosition: newPosition,
            pieceCaptured: new Piece(p.row - 1, p.column + 1),
        });
    }

    if (
        p.row + 2 < board.length && p.column - 2 >= 0 &&
        board[p.row + 1][p.column - 1] === player &&
        board[p.row + 2][p.column - 2] === 0
    ) {
        found = true;
        newPosition = new Piece(p.row + 2, p.column - 2);
        readyToMove = p;
        markPossiblePosition(newPosition);
        // save the new position and the opponent's piece position
        capturedPosition.push({
            newPosition: newPosition,
            pieceCaptured: new Piece(p.row + 1, p.column - 1),
        });
    }

    if (
        p.row + 2 < board.length && p.column + 2 < board[0].length &&
        board[p.row + 1][p.column + 1] === player &&
        board[p.row + 2][p.column + 2] === 0
    ) {
        found = true;
        newPosition = new Piece(p.row + 2, p.column + 2);
        readyToMove = p;
        markPossiblePosition(newPosition);
        // save the new position and the opponent's piece position
        capturedPosition.push({
            newPosition: newPosition,
            pieceCaptured: new Piece(p.row + 1, p.column + 1),
        });
    }

    return found;
}

function checkWinner() {
    const piecesCount = getPiecesCount();

    if (piecesCount.black == 0){
        document.getElementById("blackPiecesCount").textContent = `Black Loses`;
        document.getElementById("whitePiecesCount").textContent = `White Wins`;
    }
    else{
        document.getElementById("blackPiecesCount").textContent = `Black Wins`;
        document.getElementById("whitePiecesCount").textContent = `White Loses`;
    }
}

function reverse(player) {
    return player === -1 ? 1 : -1;
}

function getPiecesCount() {
    let black = 0;
    let white = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === -1) {
                black++;
            } else if (board[i][j] === 1) {
                white++;
            }
        }
    }

    return { black, white };
}

function changePieceColors(player) {
    var elements;
    let randomColor = getRandomColor();
    if (player === 1) {
        elements = document.getElementsByClassName('blackPiece');
        player1Color = randomColor;
    } else if (player === 2) {
        elements = document.getElementsByClassName('whitePiece');
        player2Color = randomColor;
    } else {
        return; // Handle invalid player values
    }
    // Loop through the elements
    for (var i = 0; i < elements.length; i++) {
        // Do something with each element
        elements[i].style.backgroundColor = randomColor;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBoardTexture(){
    var board1 = document.querySelector(".game");

    board1.style.backgroundImage = getRandomElement(boardTextures);
}

function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Initial board rendering
builBoard();