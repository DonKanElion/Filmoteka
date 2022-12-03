
const galleryListEl = document.querySelector('.gallery');


function createGallery(arrayForGallery) {
    const galleryMarkup = createGalleryMarkup(arrayForGallery);

    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
};

function createGalleryMarkup(imagesArray) {
    return imagesArray
        .map(image => {
            const {backdrop_path, title, genre_ids, release_date} = image;

            return `
                <div class="card">
                
                    <img class="card__poster" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt=""  loading="lazy" width="320px" height="210px"/>
                    
                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p class="info__genre"><b>${genre_ids}</b>
                        </p>
                        <p class="info__release-date"><b>${release_date}</b>
                        </p>
                        
                    </div>
                </div>
            `
        })
        .join('');
};