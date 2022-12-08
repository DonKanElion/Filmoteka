import FirebaseApi from './FirebaseApi';

const refs = {
  loginButton: document.querySelector('button[data-loginButton]'),
  closeButton: document.querySelector('button[data-closeModal]'),
  backdrop: document.querySelector('.backdrop-login'),
  modalLogin: document.querySelector('.modal-login'),
  form: document.querySelector('.form-login'),
  docBody: document.querySelector('body'),
  checkbox: document.querySelector('.checkbox-login__original'),
  loginBtn: document.querySelector('.button-login'),
  registerBtn: document.querySelector('.button-register'),
};

// console.log('open docBody', refs.form);
refs.loginButton.addEventListener('click', openLoginModal);
refs.closeButton.addEventListener('click', closeLoginModal);
refs.checkbox.addEventListener('change', onCheckboxChange);

refs.form.addEventListener('submit', onLogin);
refs.registerBtn.addEventListener('click', () => onRegister(refs.form));

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

  const newFirebaseUser = new FirebaseApi(userLoginAuth);
  // await firebaseUser.signUp();
  newFirebaseUser.registerUser();

  form.reset();
  closeLoginModal();
}

function onLogin(e) {
  e.preventDefault();

  const {
    elements: { email, password },
  } = e.currentTarget;
  console.log('email :>> ', email.value);
  console.log('password :>> ', password.value);
  const userLoginAuth = {
    email: email.value,
    password: password.value,
  };

  const firebaseUser = new FirebaseApi(userLoginAuth);
  firebaseUser.init();

  e.currentTarget.reset();
  closeLoginModal();
}

// open login modal
function openLoginModal() {
  refs.backdrop.classList.remove('backdrop-login--is-hidden');
  refs.docBody.style.overflowY = 'hidden';

  //закрытие модалки по esc
  window.addEventListener('keydown', onEscape);

  // document.querySelector('.backdrop').style.display = 'block';
  // document.querySelector('body').style.overflowY = 'hidden';
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
