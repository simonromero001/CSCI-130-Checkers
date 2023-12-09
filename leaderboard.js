class Users {
    UserName;
    JapaneseName;
    Birthday;
    Height;
    Weight;
    BloodType;
    ProductionCompany;
    AllStarPro;
    Image;

    constructor(romajiName, japaneseName, birthday, height, weight, bloodType, productionCompany, allStarPro, image) {
        this.RomajiName = romajiName;
        this.JapaneseName = japaneseName;
        this.Birthday = birthday;
        this.Height = height;
        this.Weight = weight
        this.BloodType = bloodType;
        this.ProductionCompany = productionCompany;
        this.AllStarPro = allStarPro;
        this.Image = image;
    }
}

function sortDBByIndex() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {
                    let checkBool = false;
                    if (data[i].allstarpro == 1) checkBool = true;
                    const temp = new Idol(data[i].romajiname, data[i].japanesename,
                        data[i].birthday, data[i].height,
                        data[i].weight, data[i].bloodtype,
                        data[i].productioncompany, checkBool, data[i].image);
                    newArr[i] = temp;
                }
                setup();
            }
        }
    }
    httpRequest.open('GET', './sortindex.php', true);
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
                    let checkBool = false;
                    if (data[i].allstarpro == 1) checkBool = true;
                    const temp = new Idol(data[i].romajiname, data[i].japanesename,
                        data[i].birthday, data[i].height,
                        data[i].weight, data[i].bloodtype,
                        data[i].productioncompany, checkBool, data[i].image);
                    newArr[i] = temp;
                }
                let myDiv = document.getElementById('insertStuffHere');
                myDiv.innerHTML = '';
            }
        }
    }
    httpRequest.open('GET', './sortname.php', true);
    httpRequest.send();
}