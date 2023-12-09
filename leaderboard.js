class Users {
    UserName;
    GamesWon;
    GamesPlayed;
    TimePlayed;


    constructor(userName, gamesWon, gamesPlayed, timePlayed) {
        this.UserName = userName;
        this.GamesWon = gamesWon;
        this.GamesPlayed = gamesPlayed;
        this.TimePlayed = timePlayed;
    }
}

let newArr = [];

function sortDBByIndex() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {


                    const temp = new Users(data[i].username, data[i].gameswon,
                        data[i].gamesplayed, data[i].timeplayed);
                    newArr[i] = temp;
                }
                let myDiv = document.getElementById('insertStuffHere');
                myDiv.innerHTML = '';
                for (let i = 0; i < newArr.length; i++){
                    myDiv.innerHTML += (newArr[i].UserName + ' ' + newArr[i].GamesWon + newArr[i].GamesPlayed);
                }
            }
        }
    }
    httpRequest.open('GET', './sortgameswon.php', true);
    httpRequest.send();
}

function sortDBByGamesPlayed() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {


                    const temp = new Users(data[i].username, data[i].gameswon,
                        data[i].gamesplayed, data[i].timeplayed);
                    newArr[i] = temp;
                }
                let myDiv = document.getElementById('insertStuffHere');
                myDiv.innerHTML = '';
                for (let i = 0; i < newArr.length; i++){
                    myDiv.innerHTML += (newArr[i].UserName + ' ' + newArr[i].GamesWon + newArr[i].GamesPlayed);
                }
            }
        }
    }
    httpRequest.open('GET', './sortgamesplayed.php', true);
    httpRequest.send();
}

function sortDBByTimePlayed() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {


                    const temp = new Users(data[i].username, data[i].gameswon,
                        data[i].gamesplayed, data[i].timeplayed);
                    newArr[i] = temp;
                }
                let myDiv = document.getElementById('insertStuffHere');
                myDiv.innerHTML = '';
                for (let i = 0; i < newArr.length; i++){
                    myDiv.innerHTML += (newArr[i].UserName + ' ' + newArr[i].GamesWon + newArr[i].GamesPlayed);
                }
            }
        }
    }
    httpRequest.open('GET', './sorttimeplayed.php', true);
    httpRequest.send();
}

function sortDBByName() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {


                    const temp = new Users(data[i].username, data[i].gameswon,
                        data[i].gamesplayed, data[i].timeplayed);
                    newArr[i] = temp;
                }
                let myDiv = document.getElementById('insertStuffHere');
                myDiv.innerHTML = '';
                for (let i = 0; i < newArr.length; i++){
                    myDiv.innerHTML += (newArr[i].username + ' ' + newArr[i].gamesplayed);
                }
            }
        }
    }
    httpRequest.open('GET', './sortname.php', true);
    httpRequest.send();
}