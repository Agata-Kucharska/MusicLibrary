// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});

document.getElementById("add").onclick = function() {quasiSearch()};

// quasiSearchFromGoogleCloudFirestore
function quasiSearch(){

    const col = db.collection('albums');
    const query = col.where('title', '==', document.getElementById("checkAlbum").value);

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var id = (doc.id)           
            addingData(id)
        });
    });
};

// updatingMyLibrary
function addingData(id){

    const XD = 'albums/' + id;
    console.log(XD)

    db.collection('tracks').add({
        aid: XD,
        title: document.getElementById("addTitle").value,
        length: document.getElementById("addLength").value,
        number: document.getElementById("addNumberOnAlbum").value,
    });
};