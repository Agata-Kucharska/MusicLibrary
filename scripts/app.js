const form = document.querySelector('#add-toBookshelf-form');
const myBookshelf = document.querySelector('tbody');
const mySearchResult = document.querySelector('#searchResults');

// myBookshelfTable
function renderBook(doc){

    let tr = document.createElement('tr');
    let title = document.createElement('td');
    let artist = document.createElement('td');
    let genre = document.createElement('td');
    let publication_year = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    artist.textContent = doc.data().author;
    genre.textContent = doc.data().genre;
    publication_year.textContent = doc.data().year;

    tr.appendChild(title);
    tr.appendChild(artist);
    tr.appendChild(genre);
    tr.appendChild(publication_year);

    myBookshelf.appendChild(tr);
}

// filteringMyBookshelf
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myBookshelfTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});

// definingButtonActions
document.getElementById("search").onclick = function() {quasiSearch()};
document.getElementById("add").onclick = function() {addingData()};

// quasiSearchFromGoogleCloudFirestore
function quasiSearch(){

    const col = db.collection('albums');
    const query = col.where('title', '==', form.title.value);

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var book = (doc.id, doc.data());
            displayPossible(book);
            form.title.value = '';     
        });
    });
};

// displayingSearchResult
function displayPossible(doc){

    let tr = document.createElement('tr');
    let title = document.createElement('td');
    let artist = document.createElement('td');
    let genre = document.createElement('td');
    let publication_year = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    title.textContent = doc.title;
    artist.textContent = doc.author;
    genre.textContent = doc.genre;
    publication_year.textContent = doc.year;

    tr.appendChild(title);
    tr.appendChild(artist);
    tr.appendChild(genre);
    tr.appendChild(publication_year);

    mySearchResult.appendChild(tr);
};

// updatingMyLibrary
function addingData(){
    db.collection('libraries').add({
        title: document.getElementById("searchResults").rows[0].cells[0].innerHTML,
        author: document.getElementById("searchResults").rows[0].cells[1].innerHTML,
        genre: document.getElementById("searchResults").rows[0].cells[2].innerHTML,
        year: document.getElementById("searchResults").rows[0].cells[3].innerHTML,
    });
    console.log(document.getElementById("searchResults"))
    mySearchResult.innerHTML = "";
};

// real-timeListener
db.collection('libraries').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderBook(change.doc);
        } else if (change.type == 'removed'){
            let li = bookList.querySelector('[data-id=' + change.doc.id + ']');
            bookList.removeChild(li);
        }
    })
})