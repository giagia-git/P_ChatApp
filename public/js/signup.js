var form = document.querySelector('form');

var account = form[0];
var accountValue = form[0].value;
var account_feedback = document.getElementById('account-feedback');

var password = form[1];
var passwordValue = form[1].value;
var password_feedback = document.getElementById('password-feedback');

var repassword = form[2];
var repasswordValue = form[2].value;
var repassWord_feedback = document.getElementById('repassword-feedback');

var showPassword = form[3];
var signIn = form[4];
var signUp = form[5];

var flagAccount = false;
var flagPassword = false;
var flagRepassword = false;


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
    passwordValue = password.value;
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

repassword.addEventListener("change", function() {
    repasswordValue = repassword.value;
    if(checkRepassword(repasswordValue,passwordValue)) {
        repassword.classList.remove('is-invalid');
        repassword.classList.add('is-valid');
        repassWord_feedback.classList.remove('invalid-feedback');
        repassWord_feedback.classList.add('valid-feedback');
        repassWord_feedback.textContent = "Valid";
        flagRepassword = true;
    } else {
        repassword.classList.remove('is-valid');
        repassword.classList.add('is-invalid');
        repassWord_feedback.classList.remove('valid-feedback');
        repassWord_feedback.classList.add('invalid-feedback');
        repassWord_feedback.textContent = "Invalid";
        flagRepassword = false;
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

function checkRepassword(repassword,password) {
    if(repassword === password) {
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
    if(flagAccount && flagPassword && flagRepassword) {
        
    } else {
        e.preventDefault();
    }
})