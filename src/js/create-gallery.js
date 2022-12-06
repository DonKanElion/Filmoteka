import ApiService from './apiService';

const newApiServiсe = new ApiService();

const refs = {
	gallery: document.querySelector('.gallery'),
};
console.log(refs.gallery);

newApiServiсe.fetchTrendingFilms().then(data => {
	const imagesArray = data.results;
	const markup = createGalleryMarkup(imagesArray);
	refs.gallery.innerHTML = markup;
});

// function createGallery(arrayForGallery) {
//     const galleryMarkup = createGalleryMarkup(arrayForGallery);

//     gallery.insertAdjacentHTML('beforeend', galleryMarkup);
// };

function createGalleryMarkup(imagesArray) {
	return imagesArray
		.map(image => {
			const { poster_path, title, genre_ids, release_date, id } = image;
			const releaseYear = release_date ? release_date.slice(0, 4) : ' No year';
			return `
                <div class="card" movie-id="${id}">
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
            `
		})
		.join('');
};