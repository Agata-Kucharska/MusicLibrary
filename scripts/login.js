// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);  
    } else {
        console.log('user logged out');
    }
});


// login
const loginForm = document.querySelector('#pomocy');
console.log(loginForm)

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const emailInfo = document.querySelector('#emailInfo').value;
    const passwordInfo = document.querySelector('#passwordInfo').value;

    auth.signInWithEmailAndPassword(emailInfo, passwordInfo).then(cred => {
        console.log('succes!')
        window.location.replace('mainScreen.html');
    }).catch(err => {

        loginForm.querySelector('.error').innerHTML = err.message;
    });
});


/*
// signup
const signupForm = document.querySelector('#login-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(signupForm);

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            login: signupForm['login'].value
        })
        
    }).then(() => {
        window.location.replace("index.html");
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
*/