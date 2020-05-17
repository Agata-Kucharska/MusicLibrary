// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});

document.getElementById("add").onclick = function() {addingData()};



// updatingMyLibrary
function addingData(){

    db.collection('artists-bands').add({
        name: document.getElementById("addAuthor").value,
        year: document.getElementById("addYear").value,
        genre: document.getElementById("addGenre").value,
        bio: document.getElementById("addBio").value,
    });
    
};