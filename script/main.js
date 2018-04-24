var DATA_URL = 'https://periodictable-be9c8.firebaseapp.com/data/document.xml';
var xmlDoc = null;

function onElementClick(atomicNumber) {
    getElement(atomicNumber, function (element) {
        alert(element['nama']);
    });
}

function getElement(atomicNumber, callback) {

    if (xmlDoc === null) {
        getXML(DATA_URL, function () {
            requestCallback(atomicNumber, callback);
        });
    } else {
        requestCallback(atomicNumber, callback)
    }
}

function requestCallback(atomicNumber, callback) {
    var element = xmlDoc.getElementById(atomicNumber);
    var childs = element.childNodes;
    var result = {};

    childs.forEach(function (it) {
        result[it.tagName] = it.innerHTML;
    });

    callback(result);
}

function getXML(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {

        // Callback if the request success
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            xmlDoc = new DOMParser().parseFromString(request.responseText, "text/xml");
            callback();
        }
    };
    request.send(null)
}