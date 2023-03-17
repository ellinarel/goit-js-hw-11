import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/'
const KEY = '34446168-3b6c7bd8508fcf4c0afecb303'
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
export default class MyApiServise {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
  }
  async fetchImages() {
  
      const response =
      await axios.get(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&${OPTIONS}&page=${this.page}&per_page=${this.perPage}`)
      return response
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}