var form = document.querySelector('form');

var account = form[0];
var accountValue = form[0].value;
var account_feedback = document.getElementById('account-feedback');

var password = form[1];
var passwordValue = form[1].value;
var password_feedback = document.getElementById('password-feedback');

var showPassword = form[2];
var signIn = form[3];
var signUp = form[4];

var flagAccount = false;
var flagPassword = false;

account.addEventListener("change", function() {
    accountValue = account.value;
    if(checkAccount(accountValue)) {
        account.classList.remove('is-invalid');
        account.classList.add('is-valid');
        account_feedback.classList.remove('invalid-feedback');
        account_feedback.classList.add('valid-feedback');
        account_feedback.textContent = "Valid";
        flagAccount = true;
    } else {
        account.classList.remove('is-valid');
        account.classList.add('is-invalid');
        account_feedback.classList.remove('valid-feedback');
        account_feedback.classList.add('invalid-feedback');
        account_feedback.textContent = "Invalid";
        flagAccount = false;
    }
})

password.addEventListener("change", function() {
    passwordValue = form[1].value;
    if(checkPassword(passwordValue)) {
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        password_feedback.classList.remove('invalid-feedback');
        password_feedback.classList.add('valid-feedback');
        password_feedback.textContent = "Valid";
        flagPassword = true;
    } else {
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        password_feedback.classList.remove('valid-feedback');
        password_feedback.classList.add('invalid-feedback');
        password_feedback.textContent = "Invalid";
        flagPassword = false;
    }
})

function checkAccount(account) {
    if(account.length>=5) {
        return true;
    } else {
        return false;
    } 
}

function checkPassword(password) {
    if(password.length>=5) {
        return true;
    } else {
        return false;
    } 
}

showPassword.addEventListener('click', function() {
    if(showPassword.checked) {
        password.type = "text";
    } else {
        password.type = "password";
    }
})

form.addEventListener('submit', function(e) {
    if(flagAccount && flagPassword) {
        
    } else {
        e.preventDefault();
    }
})