import ApiService from './apiService';

// TUI Pagination import after reinstall modules
import Pagination from 'tui-pagination';
import { paginationOptions } from './projectOptions';

const newApiServiсe = new ApiService();
const locStorage = {
  genres: 'genres',
};

const refs = {
  tuiContainer: document.getElementById('tui-pagination-container'),
};

setGenreNames(newApiServiсe);

newApiServiсe.fetchTrendingFilms().then(data => {
  const imagesArray = data.results;

  // Pagination
  const totalPages = data.total_pages;
  // console.log('totalPages of Start Page:>> ', totalPages);

  if (totalPages > 1) {
    // console.log(`Рендерим Пагинацию на ${totalPages} страниц`);

    const paginaton = new Pagination(refs.tuiContainer, {
      ...paginationOptions,
      totalItems: totalPages,
    });
    paginaton.on('afterMove', async ({ page }) => {
      newApiServiсe.currentPage = page;
      const response = await newApiServiсe.fetchTrendingFilms();
      const imagesArray = await response.results;
      createGalleryMarkup(imagesArray);
    });
  }

  //   const markup = createGalleryMarkup(imagesArray);
  //   refs.gallery.innerHTML = markup;

  createGalleryMarkup(imagesArray);
});

export default function createGalleryMarkup(imagesArray) {
  const refs = {
    gallery: document.querySelector('.gallery'),
  };
  refs.gallery.innerHTML = imagesArray
    .map(image => {
      const { poster_path, title, genre_ids, release_date, id } = image;
      const releaseYear = release_date ? release_date.slice(0, 4) : ' No year';
      return `
               <div class="card" movie-id="${id}">

                    <img class="card__poster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=""  loading="lazy" width="320px" height="210px"/>

                    <div  class="card__info">
                        <p class="info__title"><b>${title}</b><br/>
                        </p>
                        <p ><b class="info__genre">${getGenreNames(
                          genre_ids
                        )}</b>
                       <span class="info__span"> | </span>
                        <b class="info__release-date">${releaseYear}</b>
                        </p>

                    </div>
                </div>
            `;
    })
    .join('');
}
/** Записує жанри до локального сховища */
async function setGenreNames(apiService) {
  let promices;

  const genre = {
    id: 0,
    name: '',
  };
  try {
    promices = await apiService.dataMovies();
    const genresArray = promices.genres;
    let genresStr = '';

    genresStr += JSON.stringify(genresArray);

    localStorage.setItem(locStorage.genres, JSON.stringify(genresArray));
  } catch (error) {
    console.log('setGenresNames() error: ', error.message);
  }
}

/**Повертає імена жанрів за вказаними номерами */
function getGenreNames(genreIDs) {

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

    parsedGenres.map(genre => {
      if (genreID === genre.id) {
        genresNames += genre.name + ', ';
      }
    });
  }
  return genresNames.slice(0, -2);
}
