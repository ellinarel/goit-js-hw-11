import MyApiServise from './fetchimages';
import renderArticles from './articles';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import './sass/index.scss';

const refs = {
  formEl: document.querySelector('.search-form'),
  sentinel: document.querySelector('#sentinel'),
  loadMoreBtn: document.querySelector('.load-more'),
  photoContainer: document.querySelector('.gallery')
}

const lightbox = new SimpleLightbox('.gallery a');
const newApi = new MyApiServise();
let totalHits = 0;

const onEntry = entries => {
  entries.forEach(entrie => {
    if (entrie.isIntersecting && newApi.query !== '') {
      arrfetchImages();
    }
  });
};
const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);
function arrfetchImages() {
  setTimeout(() => {
    const totalPages = Math.ceil(newApi.totalHits / newApi.perPage);

    if (newApi.page > totalPages) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      observer.unobserve(refs.sentinel);
      return;
    }
  }, 500);
}

refs.formEl.addEventListener('submit', onSubmit)
//refs.loadMoreBtn.addEventListener('click', onLoadMore)
function onSubmit(e) {
  e.preventDefault();
  newApi.query = refs.formEl.elements.searchQuery.value.trim();
  if (newApi.query === ``) {
    Notiflix.Notify.failure('please enter search request');
    return;
  }
  newApi.resetPage();
  clealMarkup()

newApi.fetchImages()
  .then((response) => {
    const fetchedImages = response.data.hits
    totalHits = response.data.totalHits
    newApi.incrementPage()
  
    if (fetchedImages.length !== 0) {
           Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
    }
    if (fetchedImages.length  === 0) {
      Notiflix.Notify.failure('Sorry, but there are no such photos, change the request')
      return 
    }
    return fetchedImages
    
  })
  .then((images) => { appendArticlesMarkup(images) })
   .catch((e) => {
      console.log(error.name);
    });

 }
function appendArticlesMarkup(images) {
  const markup = renderArticles(images)
  refs.photoContainer.insertAdjacentHTML("beforeend", markup)
  lightbox.refresh();
}
function clealMarkup() {
  refs.photoContainer.innerHTML = '';
}
