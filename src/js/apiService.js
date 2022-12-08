import axios from 'axios';

const API_KEY = 'api_key=9790c9e061754f8ee983e30effe6feec';
const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING_URL = 'trending/movie/week?';
const SEARCH = `search/movie?`;
const GENRES_LIST = `genre/movie/list?`;

export default class ApiService {
  constructor() {
    this.inputValue = ' ';
    this.page = 1;
    this.genresId = null;
  }

  // колекція популярних фільмів
  async fetchTrendingFilms() {
    const responce = await axios.get(
      `${BASE_URL}${TRENDING_URL}${API_KEY}&page=${this.page}`
    );
    // this.incrementPage();
    return responce.data;
  }

  // колекція по пошуку за ключовим словом
  async fetchSearchFilms() {
    const responce = await axios.get(
      `${BASE_URL}${SEARCH}${API_KEY}&page=${this.page}&include_adult=false&query=${this.inputValue}`
    );
    // this.incrementPage();
    return responce.data;
  }
  async searchGanreFilms() {
    const responce = await axios.get(
      `${BASE_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_watch_monetization_types=flatrate&include_video=false&with_genres=${this.genresId}&page=${this.page}`
    );
    return responce.data;
  }

  // повна інформація про фільм
  async fetchOneFilm() {
    const responce = await axios.get(
      `${BASE_URL}movie/${this.movieId}?${API_KEY}`
    );
    return responce;
  }

  // трейлер до фільму
  async fetchTrailerFilm() {
    const responce = await axios.get(
      `${BASE_URL}movie/${this.movieId}/videos?${API_KEY}`
    );
    return responce;
  }

  //   повертає обєкт з масивом жанрів, масивом фильмів, total_pages, total_results
  async dataMovies() {
    const genres = await this.getGenres(); // Повертає жанри з АРІ
    let data = null;
    if (this.query) {
      data = await this.fetchSearchFilms();
    } else {
      data = await this.fetchTrendingFilms(); // Повертає масив фільмів з АРІ
    }
    const { results, total_pages, total_results } = data;
    return { genres, results, total_pages, total_results };
  }

  async getGenres() {
    const url = `${BASE_URL}${GENRES_LIST}${API_KEY}`; //
    const response = await axios.get(url); // Запит на АРІ за жанрами
    return response.data.genres; // Повертає проміс із жанрами
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.inputValue;
  }

  set value(newInputValue) {
    this.inputValue = newInputValue;
  }

  get currentPage() {
    return this.page;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }
}

// Імпортуємо собі в файл
// import ApiService from './js/apiService';

// const newApiServiсe = new ApiService();

// колекція популярних фільмів
// console.log(newApiServiсe.fetchTrendingFilms());

// колекція по ключевому слову
// newApiServiсe.value = e.target.searchQuery.value.trim();
// newApiServiсe.value = 'dog'
// console.log(newApiServiсe.fetchSearchFilms());

// повна інформація про фільм
// приклад movieId - число;
// newApiServiсe.movieId = 94671;
// console.log(newApiServiсe.fetchOneFilm());

// трейлер до фільму
// приклад movieId - число;
// newApiServiсe.movieId = 94671;
// console.log(newApiServiсe.fetchTrailerFilm());

// повертає обєкт з масивом жанрів, масивом фильмів, total_pages, total_results
// newApiServiсe.dataMovies().then(data => console.log(data));
