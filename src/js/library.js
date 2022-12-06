const refs = {
  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  libraryGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const watchedMovies = JSON.parse(localStorage.getItem('watched'));
const queueMovies = JSON.parse(localStorage.getItem('queue'));
console.log(watchedMovies);
// =====================================================================================

refs.btnWatched.addEventListener('click', onWatchedButtonClick);
refs.btnQueue.addEventListener('click', onQueueButtonClick);

// =====================================

function onWatchedButtonClick(event) {
  console.log(event);
  if (event.target.classList === 'watched') {
    refs.btnWatched.classList.add('selected');
    refs.btnQueue.classList.remove('selected');
  }
  createLibraryGalleryMarkup(watchedMovies);
  refs.loader.classList.add('is-hidden');
}

function onQueueButtonClick(event) {
  if (event.target.classList === 'queue') {
    refs.btnQueue.classList.add('selected');
    refs.btnWatched.classList.remove('selected');
  }
  createLibraryGalleryMarkup(queueMovies);
  refs.loader.classList.add('is-hidden');
}

function createLibraryGalleryMarkup(imagesArray) {
  console.log(imagesArray);
  refs.libraryGallery.innerHTML = imagesArray
    .map(image => {
      const { poster_path, title, genre, year } = image;
      return `
               <div class="card">
                
                    <img class="card__poster" src="${poster_path}" alt=""  loading="lazy" width="320px" height="210px"/>
                   
                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p ><b class="info__genre">${genre}</b>
                       <span class="info__span"> | </span>
                        <b class="info__release-date">${year}</b>
                        </p>
                        
                    </div>
                </div>
            `;
    })
    .join('');
}
