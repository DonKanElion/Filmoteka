
newApiServiсe.fetchTrendingFilms().then(data => {
  const imagesArray = data.results;
  const markup = createGalleryMarkup(imagesArray);
  refs.mainRef.innerHTML = markup;
});


export default function createGallery(arrayForGallery) {
  const galleryMarkup = createGalleryMarkup(arrayForGallery);

  galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
}


function createGalleryMarkup(imagesArray) {
  return imagesArray.map(image => {
      const { backdrop_path, title, genre_ids, release_date } = image;
      const releaseYear = release_date ? release_date.slice(0, 4) : ' No year';
      return `
                <div class="card">
                
                    <img class="card__poster" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt=""  loading="lazy" width="320px" height="210px"/>
                    
                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p class="info__genre"><b>${genre_ids}</b>
                        </p>
                        <p class="info__release-date"><b>${releaseYear}</b>
                        </p>
                        
                    </div>
                </div>
            `;
    })
    .join('');
};