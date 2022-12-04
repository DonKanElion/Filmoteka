export default function onButtonWatchedClick() {
  const movie = {
    id: document.querySelector('.heder-images').dataset.id,
    posterSrc: document.querySelector('.card__poster').src,
    title: document.querySelector('.info__title').textContent,
    genre: document.querySelector('.info__genre').textContent,
    release_date: document
      .querySelector('.info__release-date')
      .textContent.slice(0, 4),
    votes: document.querySelector('.vote').textContent,
  };
  // если вообще пустое хранилище, пишем
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', JSON.stringify(movie));
    return;
  }
  //   проверка нет ли такого уже в хранилище
  //  =========== может вынести в глобал???
  const moviesFromStorage = localStorage.getItem('watched');
  let moviesArray = JSON.parse(moviesFromStorage);
  // ================
  if (moviesArray.find(item => item.id === movie.id)) {
    alert(`Oops! The movie has already been added`);
    return;
  }

  //   а если нету в хранилище, добавляем
  else {
    moviesArray.push(movie);
    localStorage.setItem('watched', JSON.stringify(moviesArray));
  }
}

// const checkClickBtn = () => {
//     const btnWatched = document.querySelector(".button-watched");

//     if (btnWatched.textContent === "add to watched") {
//       btnWatched.textContent = "del from watched";
//     } else if (btnWatched.textContent === "del from watched") {
//       btnWatched.textContent = "add to watched";
//     }
//     return
//   }
