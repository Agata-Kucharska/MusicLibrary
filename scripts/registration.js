// checking authentication status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user.email);  
    } else {
        console.log('user logged out');
    }
});

// signup
const signupForm = document.querySelector('#registration');
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



