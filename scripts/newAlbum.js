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

    console.log(document.getElementById("addTitle").value)
    console.log(document.getElementById("addAuthor").value)
    console.log(document.getElementById("addYear").value)
    console.log(document.getElementById("addGenre").value)
    
    db.collection('albums').add({
        title: document.getElementById("addTitle").value,
        author: document.getElementById("addAuthor").value,
        genre: document.getElementById("addGenre").value,
        year: document.getElementById("addYear").value,
    });
    
};