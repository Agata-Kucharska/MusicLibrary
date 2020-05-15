// signup
const signupForm = document.querySelector('#registration');
    console.log(signupForm)
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
        // tutaj wszystko nieaktualne trzeba zrobić przejścia!
        const modal = document.querySelector('#signup-div');
            console.log(modal) 
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
