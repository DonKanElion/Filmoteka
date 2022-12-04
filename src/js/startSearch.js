import ApiService from './apiService';

// колекція по ключевому слову
// newApiServiсe.value = e.target.searchQuery.value.trim();
// newApiServiсe.value = 'dog'
// console.log(newApiServiсe.fetchSearchFilms());

// const galleryListEl = document.querySelector('body');
// Refs
const refs = {
  form: document.querySelector('.form'),
  errorMessage: document.getElementById('errorMessage'),
};
const api = new ApiService();

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  const {
    children: { searchQuery },
  } = e.currentTarget;

  const query = searchQuery.value.trim();
  api.value = query;

  console.log('searching:', api.value);

  try {
    const response = await api.fetchSearchFilms();
    const data = await response.results;
    const totalPages = await response.total_pages;
    const totalResults = await response.total_results;
    const emptyData = !data.length;

    console.log('response :>> ', response);
    console.log('data :>> ', data);
    console.log('totalPages :>> ', totalPages);
    console.log('totalResults :>> ', totalResults);

    showErrorMsg(emptyData);

    if (totalPages > 1) {
      console.log('Рендерим Пагинацию');
    }
    //? Render films
    // createGallery(data);

    //   console.log('response :>> ', response);
  } catch (error) {
    console.log('error :>> ', error.code);
    showErrorMsg(error);
  }
}

function showErrorMsg(showConditions) {
  if (showConditions) {
    refs.errorMessage.classList.remove('is-hidden');
    return;
  } else {
    refs.errorMessage.classList.contains('is-hidden') ||
      refs.errorMessage.classList.add('is-hidden');
  }
}

// function createGallery(arrayForGallery) {
//   const galleryMarkup = createGalleryMarkup(arrayForGallery);

//   galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
// }

// function createGalleryMarkup(imagesArray) {
//   return imagesArray
//     .map(image => {
//       const { backdrop_path, title, genre_ids, release_date } = image;

//       return `
//                 <div class="card">

//                     <img class="card__poster" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt=""  loading="lazy" width="320px" height="210px"/>

//                     <div  class="card__info">
//                         <p class="info__title"><b>${title}</b><br/>
//                         </p>
//                         <p class="info__genre"><b>${genre_ids}</b>
//                         </p>
//                         <p class="info__release-date"><b>${release_date}</b>
//                         </p>

//                     </div>
//                 </div>
//             `;
//     })
//     .join('');
// }
