import createGalleryMarkup from './create-gallery';
import getGenreNames from './create-gallery';

const refs = {
  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  libraryGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  noItemsImg: document.querySelector('.library__no-items'),
};

refs.loader.classList.add('is-hidden');

let watchedMovies = '';
let queueMovies = '';

if (localStorage.getItem('watched')) {
  watchedMovies = JSON.parse(localStorage.getItem('watched'));
} else {
  refs.btnWatched.disabled = true;
}
if (localStorage.getItem('queue')) {
  refs.queueMovies = JSON.parse(localStorage.getItem('queue'));
} else {
  btnQueue.disabled = true;
}

if (watchedMovies || queueMovies) {
  refs.noItemsImg.style.display = 'none';
}
// =====================================================================================

refs.btnWatched.addEventListener('click', onWatchedButtonClick);
refs.btnQueue.addEventListener('click', onQueueButtonClick);

// =====================================

function onWatchedButtonClick(event) {
  event.preventDefault();
  console.log(event);
  if (event.target.classList.contains('watched')) {
    console.log('WATCHED');
    refs.btnQueue.classList.remove('user-lib-btn--active');
    refs.btnWatched.classList.add('user-lib-btn--active');
  }
  refs.noItemsImg.style.display = 'none';
  createGalleryMarkup(watchedMovies);
  refs.loader.classList.add('is-hidden');
}

function onQueueButtonClick(event) {
  event.preventDefault();
  console.log(event);
  if (event.target.classList.contains('queue')) {
    console.log('queue');
    refs.btnWatched.classList.remove('user-lib-btn--active');
    refs.btnQueue.classList.add('user-lib-btn--active');
  }
  refs.noItemsImg.style.display = 'none';
  createGalleryMarkup(queueMovies);
  refs.loader.classList.add('is-hidden');
}

// function createLibraryGalleryMarkup(imagesArray) {
//   console.log(imagesArray);
//   refs.libraryGallery.innerHTML = imagesArray
//     .map(image => {
//       const { poster_path, title, genre, year } = image;
//       return `
//                <div class="card">

//                     <img class="card__poster" src="${poster_path}" alt=""  loading="lazy" width="320px" height="210px"/>

//                     <div  class="card__info">
//                         <p class="info__title"><b>${title}</b><br/>
//                         </p>
//                         <p ><b class="info__genre">${genre}</b>
//                        <span class="info__span"> | </span>
//                         <b class="info__release-date">${year}</b>
//                         </p>

//                     </div>
//                 </div>
//             `;
//     })
//     .join('');
// }
