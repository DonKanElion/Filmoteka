const refs = {
  btnWatched: document.querySelector('.style'),
  btnQueue: document.querySelector('.style'),
  movieGallery: document.querySelector('.gallery'),
};

const watchedMovies = JSON.parse(localStorage.getItem('watched'));
const queueMovies = JSON.parse(localStorage.getItem('queue'));

// =====================================================================================

// refs.movieGallery.addEventListener('click', onClickOpenModal);
refs.btnWatched.addEventListener('click', onWatchedButtonClick);
refs.btnQueue.addEventListener('click', onQueueButtonClick);

// =====================================

function onWatchedButtonClick(event) {
  if (event.target.classList === 'watched') {
    refs.btnWatched.classList.add('selected');
    refs.btnQueue.classList.remove('selected');

    renderMovies(watchedMovies);
  }
}

function onQueueButtonClick(event) {
  if (event.target.classList === 'queue') {
    refs.btnQueue.classList.add('selected');
    refs.btnWatched.classList.remove('selected');

    renderMovies(watchedMovies);
  }
}

function renderMovies(movies) {
  refs.movieGallery.innerHTML = '';
  refs.movieGallery.insertAdjacentHTML(
    'beforeend',
    createMovieGalleryMarkup(movies)
  );
}

function createMovieGalleryMarkup(movies) {
  return movies
    .map(movie => {
      const { id, posterSrc, title, genre, release_date, votes } = movie;
      const releaseYear = release_date ? release_date.slice(0, 4) : ' No year';
      return `
                <div class="card">
                
                    <img class="card__poster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=""  loading="lazy" width="320px" height="210px"/>
                   
                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p ><b class="info__genre">${genre_ids}</b>
                       <span class="info__span"> | </span>
                        <b class="info__release-date">${releaseYear}</b>
                        </p>
                        
                    </div>
                </div>
            `;
    })
    .join('');
}
