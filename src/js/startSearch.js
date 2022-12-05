import ApiService from './apiService';
import createGalleryMarkup from './create-gallery';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

// Refs
const refs = {
  form: document.querySelector('.form'),
  errorMessage: document.getElementById('errorMessage'),
  tuiContainer: document.getElementById('tui-pagination-container'),
};
const api = new ApiService();
let totalPages = 0;
const paginationOptions = {
  totalItems: 1,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
//
refs.form.addEventListener('submit', onSearch);

//
async function onSearch(e) {
  e.preventDefault();
  const {
    children: { searchQuery },
  } = e.currentTarget;

  api.value = searchQuery.value.trim();

  console.log('searching:', api.value);

  try {
    const serchResponse = await api.fetchSearchFilms();
    const serchData = await serchResponse.results;

    totalPages = await serchResponse.total_pages;
    console.log('totalPages of search:>> ', totalPages);

    // const totalResults = await response.total_results;
    const emptyData = !serchData.length;

    // console.log('serchResponse :>> ', serchResponse);
    // console.log('data :>> ', data);
    // console.log('totalPages :>> ', totalPages);
    // console.log('totalResults :>> ', totalResults);
    onSearchError(emptyData);

    if (totalPages > 1) {
      console.log(`Рендерим Пагинацию на ${totalPages} страниц`);

      const paginaton = new Pagination(refs.tuiContainer, {
        ...paginationOptions,
        totalItems: totalPages,
      });
      paginaton.on('afterMove', async ({ page }) => {
        console.log(`Предать страницу ${page} в АПИ`);
        console.log(`сделать запрос и отрендерить`);
        api.currentPage = page;
        const serchResponse = await api.fetchSearchFilms();
        const serchData = await serchResponse.results;
        createGalleryMarkup(serchData);
      });
    }
    //? Render films

    createGalleryMarkup(serchData);

    //   console.log('response :>> ', response);
  } catch (error) {
    console.log('error :>> ', error.code);
    onSearchError(error);
  }
}

async function onSearchError(showConditions) {
  if (showConditions) {
    refs.errorMessage.classList.remove('is-hidden');

    const trendingResponse = await api.fetchTrendingFilms();
    const trendingData = await trendingResponse.results;
    totalPages = await trendingResponse.total_pages;
    console.log('totalPages on error :>> ', totalPages);

    createGalleryMarkup(trendingData);
  } else {
    refs.errorMessage.classList.contains('is-hidden') ||
      refs.errorMessage.classList.add('is-hidden');
  }
}

//-----------------------------------------------------------------------------------
//TODO -----
// 1 если есть запрос - рендер даты, эррор фолс, тотал пейджес
// 2 если запрос не верный - эррор тру и рендер популярной даты, тотал пейджес, эррор МСГ
// 3 геттер сеттер на пейдж
// 4 метод рендер принимает  квери и пейдж
//-----------
// class SearchMachine {
//   constructor() {
//     this.query = '';
//     this.totalPages = 0;
//     this.page = 1;

//     this.isPaginationNeed = false;
//     this.isError = false;
//     this.errorMsg = '';

//     this.render = createGalleryMarkup;
//   }

//   init = async () => {
//     console.log('this.render :>> ', this.render);
//   };

//   search = async newQuery => {
//     this.query = newQuery;

//     try {
//       const serchResponse = await api.fetchSearchFilms();
//       const serchData = await serchResponse.results;

//       this.totalPages = await serchResponse.total_pages;
//       console.log('totalPages of search:>> ', totalPages);

//       // const totalResults = await response.total_results;
//       const emptyData = !serchData.length;

//       // console.log('serchResponse :>> ', serchResponse);
//       // console.log('data :>> ', data);
//       // console.log('totalPages :>> ', totalPages);
//       // console.log('totalResults :>> ', totalResults);
//       onSearchError(emptyData);

//       if (totalPages > 1) {
//         console.log(`Рендерим Пагинацию на ${totalPages} страниц`);
//       }
//       //? Render films
//       createGalleryMarkup(serchData);

//       //   console.log('response :>> ', response);
//     } catch (error) {
//       console.log('error :>> ', error.code);
//       onSearchError(error);
//     }
//   };

//   onSearchError;
// }

// const search = new SearchMachine();

// search.init();
//-----------------------------------------------------------------------------------
