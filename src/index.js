import MyApiServise from './fetchimages';
import renderArticles from './articles';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';




const refs = {
  formEl: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  photoContainer: document.querySelector('.gallery')
}
const lightbox = new Simplelightbox('.gallery a')

const newApi = new MyApiServise();
let searchQuery = ''; 
let totalHits = 0;

refs.formEl.addEventListener('submit', onSubmit)
refs.loadMoreBtn.addEventListener('click', onLoadMore)
 function onSubmit(e){
  e.preventDefault();
  newApi.query = refs.formEl.elements.searchQuery.value.trim();
  if (newApi.query === ``) {
    Notiflix.Notify.failure('please enter search request');
    return;
  }
  newApi.resetPage();
  newApi.fetchImages().then(images => {
    clealMarkup();
    appendArticlesMarkup(images)
  }
  );
}

function onLoadMore() {
  newApi.fetchImages().then(appendArticlesMarkup);
}

function appendArticlesMarkup(images) {
  const markup = renderArticles(images)
  refs.photoContainer.insertAdjacentHTML("beforeend", markup)
}
function clealMarkup() {
  refs.photoContainer.innerHTML = '';
}