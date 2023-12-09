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
let timeFinished = 0;
let gameDone = false;


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
var startTime = new Date().getTime();
var intervalId;

function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timeFinished = elapsedTime;
    timerElement.textContent = "Time: " + elapsedTime + " seconds";
}

function movePiece(e) {
    const piece = e.target;
    const row = parseInt(piece.getAttribute("row"));
    const column = parseInt(piece.getAttribute("column"));
    const p = new Piece(row, column);

    if (capturedPosition.length > 0) {
        enableToCapture(p);
    } else if (posNewPosition.length > 0) {
        enableToMove(p);
    }

    if (currentPlayer === board[row][column]) {
        player = reverse(currentPlayer);
        if (!findPieceCaptured(p, player)) {
            findPossibleNewPosition(p, player);
        }
    }
}

function enableToCapture(p) {
    const captureInfo = capturedPosition.find(element => element.newPosition.compare(p));

    if (captureInfo) {
        const { newPosition, pieceCaptured } = captureInfo;
        board[newPosition.row][newPosition.column] = currentPlayer;
        board[readyToMove.row][readyToMove.column] = 0;
        board[pieceCaptured.row][pieceCaptured.column] = 0;

        readyToMove = null;
        capturedPosition = [];
        posNewPosition = [];
        builBoard();
        currentPlayer = reverse(currentPlayer);
    } else {
        builBoard();
    }
}

function enableToMove(p) {
    const newPosition = posNewPosition.find(element => element.compare(p));

    if (newPosition) {
        moveThePiece(newPosition);
    } else {
        builBoard();
    }
}

function moveThePiece(newPosition) {
    board[newPosition.row][newPosition.column] = currentPlayer;
    board[readyToMove.row][readyToMove.column] = 0;

    readyToMove = null;
    posNewPosition = [];
    capturedPosition = [];

    currentPlayer = reverse(currentPlayer);

    builBoard();
}

function findPossibleNewPosition(piece, player) {
    const newRow = piece.row + player;

    function checkAndMarkPosition(direction) {
        const newColumn = piece.column + direction;
        if (newRow >= 0 && newRow < board.length && board[newRow][newColumn] === 0) {
            readyToMove = piece;
            markPossiblePosition(piece, player, direction);
        }
    }

    checkAndMarkPosition(1);
    checkAndMarkPosition(-1);
}

function markPossiblePosition(p, player = 0, direction = 0) {
    const attribute = `${parseInt(p.row + player)}-${parseInt(p.column + direction)}`;
    const position = document.querySelector(`[data-position='${attribute}']`);

    if (position) {
        position.style.background = "yellow";
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
        let row = document.createElement("tr");
        row.setAttribute("class", "row");

        for (let j = 0; j < element.length; j++) {
            const elmt = element[j];
            let col = document.createElement("td");
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

            if (board[i][j] === 1) {
                occupied = "whitePiece";
                piece.style.backgroundColor = player2Color;
            } else if (board[i][j] === -1) {
                occupied = "blackPiece";
                piece.style.backgroundColor = player1Color; 
            } else {
                occupied = "empty";
            }

            piece.setAttribute("class", "occupied " + occupied);

            piece.setAttribute("row", i);
            piece.setAttribute("column", j);
            piece.setAttribute("data-position", i + "-" + j);

            piece.addEventListener("click", movePiece);

            col.appendChild(piece);
            col.setAttribute("class", "column " + caseType);
            row.appendChild(col);

            if (board[i][j] === -1) {
                black++;
            } else if (board[i][j] === 1) {
                white++;
            }
        }

        game.appendChild(row);
    }

    const piecesCount = getPiecesCount();

    if (piecesCount.black > piecesCount.white) {
        document.getElementById("blackPiecesCount").textContent = `Currently Winning: Black: ${piecesCount.black}`;
        document.getElementById("whitePiecesCount").textContent = `White Pieces: ${piecesCount.white}`;
    }
    else if (piecesCount.black < piecesCount.white) {
        document.getElementById("blackPiecesCount").textContent = `Black Pieces: ${piecesCount.black}`;
        document.getElementById("whitePiecesCount").textContent = `Currently Winning: White Pieces: ${piecesCount.white}`;
    }
    else {
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
        capturedPosition.push({
            newPosition: newPosition,
            pieceCaptured: new Piece(p.row + 1, p.column + 1),
        });
    }

    return found;
}

function checkWinner() {
    const piecesCount = getPiecesCount();

    if (piecesCount.black == 0) {
        document.getElementById("blackPiecesCount").textContent = `Black Loses`;
        document.getElementById("whitePiecesCount").textContent = `White Wins`;
        stopTimer();
    } else {
        document.getElementById("blackPiecesCount").textContent = `Black Wins`;
        document.getElementById("whitePiecesCount").textContent = `White Loses`;
        stopTimer();
        getUsername().then(username => {
            if (username !== '') {
                console.log('Username from session:', username);
                const userInfoContainer = document.getElementById('userInfo');
                userInfoContainer.textContent = 'Username: ' + username;

                var xhr = new XMLHttpRequest();
                xhr.open('GET', './addWinGame.php?username=' + username + '&time=' + timeFinished, true);
                xhr.send();
            } else {
                console.log('User not logged in.');
                const userInfoContainer = document.getElementById('userInfo');
                userInfoContainer.textContent = 'Not logged in!';
            }
        });
    }
}

function getUsername() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'getSession.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                const username = responseData.username;
                resolve(username);
            } else {
                reject('Error getting username');
            }
        };

        xhr.send();
    });
}

function addGame() {
    getUsername().then(username => {
        if (username !== '') {
            console.log('Username from session:', username);
            const userInfoContainer = document.getElementById('userInfo');
            userInfoContainer.textContent = 'Username: ' + username;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './addGame.php?username=' + username, true);
            xhr.send();
        } else {
            console.log('User not logged in.');
            const userInfoContainer = document.getElementById('userInfo');
            userInfoContainer.textContent = 'Not logged in!';
        }
    });
}



function reverse(player) {
    return player === -1 ? 1 : -1;
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
        return;
    }
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = randomColor;
    }
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

function changeBoardTexture() {
    var board1 = document.querySelector(".game");

    board1.style.backgroundImage = getRandomElement(boardTextures);
}

function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

builBoard();