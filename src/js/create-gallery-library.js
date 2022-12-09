const locStorage = {
  genres: 'genres',
};

export const defaulPosterImg = 'https://i.ibb.co/1dYzZxK/Filmoteka-dummy.jpg';

export default function createGalleryMarkup(imagesArray) {
  console.log('===>start function createGalleryMarkup');
  console.log('imagesArray::::', imagesArray);
  const refs = {
    gallery: document.querySelector('.gallery'),
  };

  refs.gallery.innerHTML = imagesArray
    .map(image => {
      const { poster_path, title, genre_ids, release_date, id, vote_average } =
        image;
      const releaseYear = release_date ? release_date.slice(0, 4) : ' No year';

      //Встановлення заглушки для постеру
      const srcPath =
        poster_path === null
          ? defaulPosterImg
          : `https://image.tmdb.org/t/p/w500${poster_path}`;

      return `
               <div class="card" movie-id="${id}">
               <img class="card__poster"  src=${srcPath} alt
               ="poster movie ${title}"  loading="lazy" width="320px" height="210px" />
                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p ><b class="info__genre">${getGenreNames(
                          genre_ids
                        )}</b>
                       <span class="info__span"> | </span>
                        <b class="info__release-date">${releaseYear}</b>
                      <span class="info__vote_average">${vote_average.toFixed(
                        1
                      )}</span>
                                              </p>
                    </div>
                </div>
            `;
    })
    .join('');
}

/**Повертає імена жанрів за вказаними номерами */
export function getGenreNames(genreIDs) {
  let genres;
  let parsedGenres;
  try {
    genres = localStorage.getItem(locStorage.genres);
    parsedGenres = JSON.parse(genres);
  } catch (error) {
    console.log('getGenreNames() error: ', error.message);
  }

  let genresNames = '';
  for (let i = 0; i < genreIDs.length; i++) {
    const genreID = genreIDs[i];

    if (i > 1) {
      genresNames += 'Other';
      return genresNames;
    }

    parsedGenres.map(genre => {
      if (genreID === genre.id) {
        genresNames += genre.name + ', ';
      }
    });
  }
  return genresNames.slice(0, -2);
}
