// import { ref } from 'firebase/database';
import FirebaseApi from './FirebaseApi';

const refs = {
  loginButton: document.querySelector('button[data-button="login"]'),
  closeButton: document.querySelector('button[data-closeModal]'),
  backdrop: document.querySelector('.backdrop-login'),
  modalLogin: document.querySelector('.modal-login'),
  form: document.querySelector('.form-login'),
  docBody: document.querySelector('body'),
  checkbox: document.querySelector('.checkbox-login__original'),
  loginBtn: document.querySelector('.button-login'),
  registerBtn: document.querySelector('.button-register'),
  loginBox: document.querySelector('.login'),
  userName: document.querySelector('.login__user-name'),
};

refs.loginButton.addEventListener('click', openLoginModal);
refs.closeButton.addEventListener('click', closeLoginModal);
refs.checkbox.addEventListener('change', onCheckboxChange);

refs.form.addEventListener('submit', onLogin);
refs.registerBtn.addEventListener('click', () => onRegister(refs.form));

const newFirebaseUser = new FirebaseApi();
checkLoginedUser();

function onCheckboxChange(e) {
  const checked = e.currentTarget.checked;

  refs.loginBtn.disabled = checked;
  refs.registerBtn.disabled = !checked;
}

async function onRegister(form) {
  const {
    elements: { email, password },
  } = form;
  // console.log('email :>> ', email.value);
  // console.log('password :>> ', password.value);

  const userLoginAuth = {
    email: email.value,
    password: password.value,
  };

  // await firebaseUser.signUp();
  newFirebaseUser.setUser(userLoginAuth);
  await newFirebaseUser.registerUser();

  checkLoginedUser();

  refs.loginBtn.disabled = false;
  refs.registerBtn.disabled = true;

  form.reset();
  closeLoginModal();
}

function onLogin(e) {
  e.preventDefault();

  const {
    elements: { email, password },
  } = e.currentTarget;
  // console.log('email :>> ', email.value);
  // console.log('password :>> ', password.value);
  const userLoginAuth = {
    email: email.value,
    password: password.value,
  };
  newFirebaseUser.setUser(userLoginAuth);
  // const firebaseUser = new FirebaseApi(userLoginAuth);
  newFirebaseUser.init();
  // checkLoginedUser();

  e.currentTarget.reset();
  closeLoginModal();
}

// open login modal
function openLoginModal() {
  if (refs.loginButton.dataset.button === 'login') {
    // console.log('кнопка логин есть', refs.loginButton);
    refs.backdrop.classList.remove('backdrop-login--is-hidden');
    refs.docBody.style.overflowY = 'hidden';
    //закрытие модалки по esc
    window.addEventListener('keydown', onEscape);
  }
}
// close login modal
function closeLoginModal() {
  refs.backdrop.classList.add('backdrop-login--is-hidden');
  refs.docBody.style.overflowY = 'visible';

  window.removeEventListener('keydown', onEscape);
}
// close by backdrop
window.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    closeLoginModal();
  }
});
// close by Esc
function onEscape(e) {
  if (e.key === 'Escape') {
    closeLoginModal();
  }
}

async function checkLoginedUser() {
  // console.log('check');

  // refs.loginBtn.disabled = false;
  // refs.registerBtn.disabled = true;

  const userAuth = newFirebaseUser.auth;
  const user = newFirebaseUser.authHandler(userAuth, userObj => {
    // console.log('status :>> ', newFirebaseUser.getUserStatus());
    // console.log('userObj :>> ', userObj);

    // const status = newFirebaseUser.getUserStatus();
    if (userObj !== null) {
      console.log('mail :>> ', userObj.email);
      refs.loginBox.classList.add('login--is-logined');
      refs.loginButton.dataset.button = 'logout';
      refs.userName.innerHTML = userObj.email;
      const logOutBtn = document.querySelector('button[data-button="logout"]');
      logOutBtn.addEventListener('click', onLogout);
    }
  });

  return user;
  // console.log('  newFirebaseUser.auth :>> ', user);
}

function onLogout() {
  if (refs.loginButton.dataset.button !== 'login') {
    refs.loginButton.dataset.button = 'login';
    refs.loginBox.classList.remove('login--is-logined');
    // newFirebaseUser.setUserStatus(false);
    newFirebaseUser.logOut();
  }
}
