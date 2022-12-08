const refs = {
  loginButton: document.querySelector('button[data-loginButton]'),
  closeButton: document.querySelector('button[data-closeModal]'),
  backdrop: document.querySelector('.backdrop-login'),
  modalLogin: document.querySelector('.modal-login'),
  form: document.querySelector('.form-login'),
  docBody: document.querySelector('body'),
  checkbox: document.querySelector('.checkbox__original'),
  registerBtn: document.querySelector('.button-register'),
};

// console.log('open docBody', refs.form);
refs.loginButton.addEventListener('click', openLoginModal);
refs.closeButton.addEventListener('click', closeLoginModal);
refs.form.addEventListener('submit', onLogin);
refs.checkbox.addEventListener('change', onCheckboxChange);

function onCheckboxChange(e) {
  const checked = e.currentTarget.checked;

  refs.registerBtn.disabled = !checked;
}

function onLogin(e) {
  e.preventDefault();

  const {
    elements: { email, password, conditions, registerBtn },
  } = e.currentTarget;
  console.log('email :>> ', email);
  console.log('password :>> ', password);
  console.log('conditions :>> ', conditions);
  console.log('registerBtn :>> ', registerBtn);

  console.log('user login data :>> ');
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
