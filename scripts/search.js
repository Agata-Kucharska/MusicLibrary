const form = document.querySelector('#add-toBookshelf-form');
const formA = document.querySelector('#add-artist-toBookshelf-form');
const mySearchResult = document.querySelector('#searchResults');
const mySearchResultA = document.querySelector('#searchResultsA');

// definingButtonActions
document.getElementById("search").onclick = function() {quasiSearch()};
document.getElementById("searchA").onclick = function() {quasiSearchArtist()};

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

function quasiSearchArtist(){

    const col = db.collection('artists-bands');
    const query = col.where('name', '==', formA.name.value);

    query.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            var artist = (doc.id, doc.data());
            displayPossibleArtist(artist);
            formA.name.value = '';     
        });
    });
};

// displayingSearchResult
function displayPossible(doc){
    mySearchResult = ''

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

function displayPossibleArtist(doc){
    console.log('wchodze tutaj')

    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let about = document.createElement('td');
    let genre = document.createElement('td');
    let publication_year = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.name;
    about.textContent = doc.bio;
    genre.textContent = doc.genre;
    publication_year.textContent = doc.year;

    tr.appendChild(name);
    tr.appendChild(about);
    tr.appendChild(genre);
    tr.appendChild(publication_year);

    mySearchResultA.appendChild(tr);
};
