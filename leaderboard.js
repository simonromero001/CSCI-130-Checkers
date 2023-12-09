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
                setup();
            }
        }
    }
    httpRequest.open('GET', './sortname.php', true);
    httpRequest.send();
}