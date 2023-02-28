import { createGalleryMarkupLibrary } from './create-gallery-library';
import { getLocalStorage } from './LocaleStorageApi';

import Pagination from 'tui-pagination';
import { paginationOptions } from './projectOptions';
let KEY = '';
export let moviesFromStorage = '';
const CARDS_PER_PAGE = 1000;
const refs = {
  btnWatched: document.querySelector('.watched'),
  btnQueue: document.querySelector('.queue'),
  btnList: document.querySelector('.library-header__buttons'),
  libraryGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  noItemsImg: document.querySelector('.library__no-items'),
  tuiContainer: document.getElementById('tui-pagination-container'),
};

window.addEventListener('load', () => {
  refs.btnQueue.click();
});

refs.btnList.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  try {
    let { name: key, tagName } = evt.target;
    KEY = key.toUpperCase();
    if (tagName !== 'BUTTON') return;

    switch (KEY) {
      case 'QUEUE':
        refs.btnQueue.classList.add('library-header__button--active');
        refs.btnWatched.classList.remove('library-header__button--active');
        break;
      case 'WATCHED':
        refs.btnWatched.classList.add('library-header__button--active');
        refs.btnQueue.classList.remove('library-header__button--active');
        break;
      default:
        break;
    }

    moviesFromStorage = getLocalStorage(KEY);
    const totalCards = moviesFromStorage.length;
    const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);
    if (totalPages < 2) {
      refs.tuiContainer.style.display = 'none';
    }

    const paginaton = new Pagination(refs.tuiContainer, {
      ...paginationOptions,
      totalItems: totalPages,
    });

    paginaton.on('afterMove', aferMovePagination);

    if (!moviesFromStorage.length) {
      refs.libraryGallery.innerHTML = '';
      refs.noItemsImg.style.display = 'block';
      refs.loader.classList.add('is-hidden');
      return;
    }

    refs.loader.classList.add('is-hidden');
    refs.noItemsImg.style.display = 'none';
    const sliced = cutDataForPagination(moviesFromStorage);
    makePagination(1, sliced);
  } catch (error) {
    console.log(error);
    refs.libraryGallery.innerHTML = '';
  } finally {
    return KEY, moviesFromStorage;
  }
}

export function refreshLibrary() {
  switch (KEY) {
    case 'QUEUE':
      refs.btnQueue.click();
      break;
    case 'WATCHED':
      refs.btnWatched.click();
      break;
    default:
      break;
  }
}

function aferMovePagination(event) {
  const currentPage = event.page;
  makePagination(currentPage, moviesFromStorage);
  scrollSmooth.to(0);
}

export function makePagination(page = 1, moviesForPagination) {
  const cuttedDataPagination = cutDataForPagination(moviesForPagination);
  const pageMovies = cuttedDataPagination[0][page - 1];
  createGalleryMarkupLibrary(pageMovies);
}

function cutDataForPagination(DataArray) {
  const totalCards = moviesFromStorage.length;
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);
  let newDataArray = [];
  for (let i = 0; i < totalPages; i += 1) {
    const firstMovieOnPage = i * CARDS_PER_PAGE;
    const lastMovieOnPage = (i + 1) * CARDS_PER_PAGE;
    newDataArray.push(DataArray.slice([firstMovieOnPage], [lastMovieOnPage]));
  }
  return newDataArray;
}
