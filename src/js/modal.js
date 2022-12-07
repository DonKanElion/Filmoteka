import { getGenreNames } from './create-gallery';

function openModal() {
  document.querySelector('.backdrop').style.display = "block";
  document.querySelector('body').style.overflowY = 'hidden';
}

function closeModal() {
  document.querySelector('.backdrop').style.display = "none";
  document.querySelector('body').style.overflowY = 'visible';
}

document.querySelector('.modal__close').addEventListener("click", closeModal);
document.querySelector('.gallery').addEventListener("click", function(e) {
  let targetItem = e.target;
  if (targetItem.closest('.card')){
    const movieId = targetItem.closest('.card').getAttribute('movie-id');
    const data = JSON.parse(localStorage.getItem('movieData'));

    const movie = data.find((item)=> {
      if (Number(movieId) === item.id) {
        return true;
      }
    })

    document.querySelector('.content-card__img>img').setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path);
    document.querySelector('.content-card__title').innerText = movie.title;
    document.querySelector('.content-card__about-text').innerText = movie.overview;
    document.querySelector('.modal__movie-bord').innerText = movie.vote_average.toFixed(1);
    document.querySelector('.modal__movie-number').innerText = movie.vote_count;
    document.querySelector('.modal__movie-popularity').innerText = movie.popularity.toFixed(1);
    document.querySelector('.modal__movie-original').innerText = movie.original_title;
    document.querySelector('.modal__movie-genres').innerText = getGenreNames(movie.genre_ids);

    openModal();
  }
});

//закриття модалки по кліку поза модалки
window.addEventListener("click", function(event) {
  if (event.target === document.querySelector('.backdrop')) {
    closeModal();
  }
});

//закрытие модалки по esc
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
})





