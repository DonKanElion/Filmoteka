function openModal() {
  document.querySelector('.backdrop').style.display = "block";
  document.querySelector('body').style.overflowY = 'hidden';
}

function closeModal() {
  // document.querySelector('.content-card__img>img').setAttribute('src', '#');
  // document.querySelector('.content-card__title').innerText = '';
  // document.querySelector('.content-card__about-text').innerText = '';
  document.querySelector('.backdrop').style.display = "none";
  document.querySelector('body').style.overflowY = 'visible';
}

document.querySelector('.modal__close').addEventListener("click", closeModal);
document.querySelector('.gallery').addEventListener("click", function(e) {
  let targetItem = e.target;
  if (targetItem.closest('.card')){
    const movieId = targetItem.closest('.card').getAttribute('movie-id');


    openModal();
  }
});

window.addEventListener("click", function(event) {
  if (event.target === document.querySelector('.backdrop')) {
    closeModal();
  }
});