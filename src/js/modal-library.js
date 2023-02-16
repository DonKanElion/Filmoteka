import { moviesFromStorage } from "./library";
import { getGenreNames } from "./create-gallery-library";

const storageKeys = {
  watched: "WATCHED",
  queue: "QUEUE",
};
const buttonStates = {
  on: "REMOVE FROM",
  off: "ADD TO",
};

const addWatchedBtn = document.querySelector(".watched-btn");
const addQueueBtn = document.querySelector(".queue-btn");

addWatchedBtn.addEventListener("click", onAddWatchedBtn);
addQueueBtn.addEventListener("click", onAddQueueBtn);

function storageHasMovie(storageKey, movieID) {
  let storageMoviesStr;
  try {
    storageMoviesStr = localStorage.getItem(storageKey);
    //Якщо сховище не пусте
    if (storageMoviesStr) {
      let storageMoviesObj = JSON.parse(storageMoviesStr);

      for (let i = 0; i < storageMoviesObj.length; i++) {
        if (storageMoviesObj[i].id === movieID) {
          return true;
        }
      }
    }
  } catch (error) {
    console.log("storageHasMovie() error: " + error);
  }
  return false;
}

import { refreshLibrary } from "./library";

export let btnState = {
  watched: false,
  queue: false,
};
export let currentMovie;

const refs = {
  libraryGallery: document.querySelector(".gallery"),
};

refs.libraryGallery.addEventListener("click", handleDataModal);
document.querySelector(".modal__close").addEventListener("click", closeModal);

export function handleDataModal(e) {
  const defaulPosterImg = "https://i.ibb.co/1dYzZxK/Filmoteka-dummy.jpg";
  let targetItem = e.target;
  if (targetItem.closest(".card")) {
    const movieId = targetItem.closest(".card").getAttribute("movie-id");
    const data = moviesFromStorage;
    const movie = data.find(item => {
      if (Number(movieId) === item.id) {
        return true;
      }
    });
    currentMovie = movie;

    const srcPath =
      movie.poster_path === null
        ? defaulPosterImg
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    document
      .querySelector(".content-card__img>img")
      .setAttribute("src", srcPath);
    document.querySelector(".content-card__title").innerText = movie.title;
    document.querySelector(".content-card__about-text").innerText =
      movie.overview;

    document.querySelector(".modal__movie-bord").innerText =
      movie.vote_average.toFixed(1);
    document.querySelector(".modal__movie-number").innerText = movie.vote_count;
    document.querySelector(".modal__movie-popularity").innerText =
      movie.popularity.toFixed(1);
    document.querySelector(".modal__movie-original").innerText =
      movie.original_title;
    document.querySelector(".modal__movie-genres").innerText = getGenreNames(
      movie.genre_ids
    );

    openModal();
  }
}

// открытие модалки
// =====================================
export function openModal() {
  document.querySelector(".backdrop").style.display = "block";
  document.querySelector("body").style.overflowY = "hidden";

  //Встановлення тексту кнопки "ADD TO WATCHED"
  if (storageHasMovie(storageKeys.watched, currentMovie.id)) {
    addWatchedBtn.textContent = buttonStates.on + " " + storageKeys.watched;
  } else {
    addWatchedBtn.textContent = buttonStates.off + " " + storageKeys.watched;
  }

  //Встановлення тексту кнопки "ADD TO QUEUE"
  if (storageHasMovie(storageKeys.queue, currentMovie.id)) {
    addQueueBtn.textContent = buttonStates.on + " " + storageKeys.queue;
  } else {
    addQueueBtn.textContent = buttonStates.off + " " + storageKeys.queue;
  }
}

export function closeModal() {
  document.querySelector(".backdrop").style.display = "none";
  document.querySelector("body").style.overflowY = "visible";
  refreshLibrary();
}

//закриття модалки по кліку поза модалки
window.addEventListener("click", function (event) {
  if (event.target === document.querySelector(".backdrop")) {
    closeModal();
  }
});
//закрытие модалки по esc
window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal();
  }
});

/** Обробка натискання "ADD TO WATCHED" */
function onAddWatchedBtn(event) {
  addMovieToStorage(storageKeys.watched, currentMovie, addWatchedBtn);

  if (btnState.watched) {
    btnState.watched = false;
    addWatchedBtn.classList.remove("active");
    addWatchedBtn.blur();
  } else {
    btnState.watched = true;
    addWatchedBtn.classList.add("active");
  }
}

/** Обробка натискання "ADD TO QUEUE" */
function onAddQueueBtn(event) {
  addMovieToStorage(storageKeys.queue, currentMovie, addQueueBtn);

  if (btnState.queue) {
    btnState.queue = false;
    addQueueBtn.classList.remove("active");
    addQueueBtn.blur();
  } else {
    btnState.queue = true;
    addQueueBtn.classList.add("active");
  }
}

function addMovieToStorage(key, movie, button) {
  let storageMoviesStr;
  let movieStr;

  try {
    //console.log("currentMovie (modal): " + JSON.stringify(movie.id));
    storageMoviesStr = localStorage.getItem(key);
    movieStr = JSON.stringify([movie]);

    if (!storageMoviesStr) {
      localStorage.setItem(key, movieStr);
      button.textContent = buttonStates.on + " " + key;
      button.classList.add("active");
      return;
    }

    let storageMoviesObj = JSON.parse(storageMoviesStr);

    for (let i = 0; i < storageMoviesObj.length; i++) {
      if (storageMoviesObj[i].id === movie.id) {
        storageMoviesObj.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(storageMoviesObj));
        button.textContent = buttonStates.off + " " + key;

        return;
      }
    }

    storageMoviesObj.push(movie);
    localStorage.setItem(key, JSON.stringify(storageMoviesObj));
    button.textContent = buttonStates.on + " " + key;
  } catch (error) {
    console.log("addMovieToStorage() error: ", error.message);
  }
}
