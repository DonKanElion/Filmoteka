// Імпортуємо собі в файл
import ApiService from './apiService';
import createGalleryMarkup from './create-gallery'
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { paginationOptions } from './projectOptions';

export const refs = {
  galleryList: document.querySelector('.gallery'),
  element: document.querySelector('.pagination ul'),
  button: document.querySelector('.dropbtn'),
  dropdownContent: document.querySelector('.dropdown-content'),
  dropdown: document.querySelector('.dropdown'),
  tuiContainer: document.getElementById('tui-pagination-container'),
};

const newApiServiсe = new ApiService();

window.addEventListener('click', onClick);
refs.dropdownContent.addEventListener('click', onGenre);

function onClick(event) {
    if (!event.target.classList.contains('dropbtn')) {
        refs.dropdownContent.classList.remove('show');
        return;
    }
    //   refs.element.removeEventListener('click', onClickPagination);
    refs.dropdownContent.classList.toggle('show');
    renderGenres();
}

async function renderGenres() {
  try {
    const genres = await newApiServiсe.getGenres();
    const markup = murkupFilterGenres(genres);
     
    refs.dropdownContent.innerHTML = markup.join('');

  } catch (error) {
    error.message;
  } 
}

function onGenre(event) {
  const target = event.target;
  const genreEl = target.closest('.genre-name');
  
    if (!genreEl) {
      return;
    }
    
    refs.button.textContent = target.textContent;
    newApiServiсe.genresId = genreEl.dataset.genreid;

    searchGenres();
}

function murkupFilterGenres(genres) {
  return genres.map(genre => {
    // console.log(genre.name, genre.id);
    return ` <li class ="genre-name" data-genreid="${genre.id}">${genre.name}</li>`;
  });
}

async function searchGenres() {
    const films = await newApiServiсe.searchGanreFilms();
    const totalPages = films.total_pages;
    const imagesArray = films.results;
    
        localStorage.setItem('movieData', JSON.stringify(films.results));
        
    createGalleryMarkup(imagesArray);// Рендерить розмітку для карток по жанрам
        
    if (totalPages > 1) {
                        
            const paginaton = new Pagination(refs.tuiContainer, {
                ...paginationOptions,
                totalItems: totalPages,
            });
        
            paginaton.on('afterMove', async ({ page }) => {
              newApiServiсe.currentPage = page;
              const films = await newApiServiсe.searchGanreFilms();
    
              localStorage.setItem('movieData', JSON.stringify(films.results));
              createGalleryMarkup(films.results); // Рендерить розмітку для карток на кнопках пагінації
            });
        }
    }


