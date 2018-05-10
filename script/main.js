var DATA_URL = 'https://periodictable-be9c8.firebaseapp.com/data/document.xml';
var xmlDoc = null;

// Dialog things
var dialog = null;

function onElementClick(atomicNumber) {
    getElement(atomicNumber, function (element) {
        if (dialog === null) {
            dialog = document.getElementById('dialogResult');
        }
        dialog.style.display = 'block';

        for (var key in element) {

            // skip loop if the property is from prototype
            if (!element.hasOwnProperty(key)) continue;

            var doc = document.getElementById(key);
            if (doc !== null) {
                doc.getElementsByTagName('p')[0].innerHTML = element[key];
            }
        }
    });
}

function getElement(atomicNumber, callback) {

    if (xmlDoc === null) {
        getXML(DATA_URL, function () {
            requestCallback(atomicNumber, callback);
        });
    } else {
        requestCallback(atomicNumber, callback);
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
    request.addEventListener("load", function (event) {
        xmlDoc = new DOMParser().parseFromString(request.responseText, "text/xml");
        callback();
    });
    request.send(null)
}
