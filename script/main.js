var DATA_URL = 'https://periodictable-be9c8.firebaseapp.com/data/document.xml';
var xmlDoc = null;

// Dialog things
var dialog = null;

function onElementClick(atomicNumber) {
    openNav();
    var kotak = document.getElementById(atomicNumber);
    var sideKotak = document.getElementById("sideKotak");

    sideKotak.children[0].innerHTML = atomicNumber;
    if (kotak.children[0].children[2] == null) {
        var child = sideKotak.children[1];
        child.innerHTML = kotak.children[0].innerHTML;
        child.removeChild(child.children[0]);
        child.removeChild(child.children[0]);
    } else {
        sideKotak.children[1].innerHTML = kotak.children[0].children[2].innerHTML;
    }
    sideKotak.setAttribute("class", kotak.children[0].getAttribute("class"));
    requestUnsur(atomicNumber, function (unsur) {
        var penjelasan = unsur["penjelasan"];
        document.getElementById("overview").innerHTML = penjelasan;
    });
}

function popup() {
    closeNav();
    var atomicNumber = document.getElementById("nomor_atom").innerHTML;
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

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("all").style.right = "44%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("all").style.right = "50%";
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
