var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('profile');
provider.addScope('email');

function login() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        document.getElementById('dialog-login').style.display = 'none';
    }).catch(function (error) {
        console.log(error);
    });
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}