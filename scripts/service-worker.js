const CACHE_NAME = 'MusicLibrary';

// List of files which are store in cache.
let filesToCache = [
    '/accountManagement.html',
    '/registration.html',
    '/album.html',
	'/artist.html',
	'/changePassword.html',
	'/index.html',
	'/loading.html',
	'/login.html',
	'/mainScreen.html',
	'/myLibrary.html',
	'/newAlbum.html',
	'/newArtist.html',
	'/newTrack.html',
	'/passwordReset.html',
	'/registration.html',
	'/scripts/accountManagement.js',
	'/scripts/app.js',
	'/scripts/auth.js',
	'/scripts/changePassword.js',
	'/scripts/index.js',
	'/scripts/login.js',
	'/scripts/newAlbum.js',
	'/scripts/newArtist.js',
	'/scripts/newTrack.js',
	'/scripts/registration.js',
	'/scripts/search.js',
	'/style/mainScreen.css',
	'/style/myLibrary.css',
	'/style/passwordReset.css',
	'/style/style.css',
	'/images/better_logo.png',
	'/images/gear_button.jpg',
	'/images/logo.png',
	'/README.md',
];

self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(filesToCache);
        }).catch(function (err) {
            // Snooze errors...
            // console.error(err);
        })
    );
});

self.addEventListener('fetch', function (evt) {
    // Snooze logs...
    // console.log(event.request.url);
    evt.respondWith(
        // Firstly, send request..
        fetch(evt.request).catch(function () {
            // When request failed, return file from cache...
            return caches.match(evt.request);
        })
    );
});
