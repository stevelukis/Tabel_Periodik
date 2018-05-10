var DATA_URL = 'https://periodictable-be9c8.firebaseapp.com/data/document.xml';
var xmlDoc = null;

// Dialog things
var dialog = null;

function onElementClick(atomicNumber) {
    requestUnsur(atomicNumber, function (element) {
        if (dialog === null) {
            dialog = document.getElementById('dialogResult');
        }
        dialog.style.display = 'block';

        for (var key in element) {
            var doc = document.getElementById(key);
            if (doc !== null) {
                doc.getElementsByTagName('p')[0].innerHTML = element[key];
            }
        }
    });
}

function requestUnsur(atomicNumber, callback) {

    if (xmlDoc === null) {
        getXML(DATA_URL, function () {
            var unsur = getUnsurObject(atomicNumber);
            callback(unsur);
        });
    } else {
        var unsur = getUnsurObject(atomicNumber);
        callback(unsur);
    }
}

function getUnsurObject(atomicNumber) {
    var element = xmlDoc.getElementById(atomicNumber);
    var children = element.childNodes;
    var result = {};

    children.forEach(function (it) {
        result[it.tagName] = it.innerHTML;
    });

    return result;
}

function getXML(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener("load", function (event) {
        xmlDoc = new DOMParser().parseFromString(request.responseText, "text/xml");
        callback();
    });
    request.send(null)
}
