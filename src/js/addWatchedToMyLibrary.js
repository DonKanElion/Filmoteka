export default function onButtonWatchedClick() {
  const movie = {
    id: document.querySelector('.content-card__title').dataset.id,
    poster_path: document.querySelector('.content-card__img').src,
    title: document.querySelector('.content-card__title').textContent,
    genre: document.querySelector('.genre-modal').textContent,
    year: document.querySelector('.content-card__title').dataset.year,
    votes: document.querySelector('.content-card__vote').textContent,
  };
  // если вообще пустое хранилище, пишем
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', JSON.stringify([movie]));
    return;
  }
  //   проверка нет ли такого уже в хранилище
  //  =========== может вынести в глобал??? Вынес!
  const moviesFromStorage = localStorage.getItem('watched');
  let watchedMovies = JSON.parse(moviesFromStorage);
  // ================
  if (watchedMovies.find(item => item.id === movie.id)) {
    alert(`Oops! The movie has already been added`);
    return;
  }

  //   а если нету в хранилище, добавляем
  else {
    watchedMovies.push(movie);
    localStorage.setItem('watched', JSON.stringify(watchedMovies));
  }
}
