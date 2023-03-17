import MyApiServise from './fetchimages';
import renderArticles from './articles';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import './styles.css';

const refs = {
  formEl: document.querySelector('.search-form'),
  sentinel: document.querySelector('#sentinel'),
  photoContainer: document.querySelector('.gallery')
}

const lightbox = new SimpleLightbox('.gallery a');
const newApi = new MyApiServise();
let totalHits = 0;


function onEntry(entries) {
  setTimeout(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !newApi.isLoading) {
        newApi.isLoading = true;
        newApi.fetchImages()
          .then(response => {
            const fetchedImages = response.data.hits;
            totalHits = response.data.totalHits;
            newApi.incrementPage();
            if (fetchedImages.length !== 0) {
              appendArticlesMarkup(fetchedImages);
              newApi.isLoading = false;
            } else {
              Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
              observer.unobserve(sentinel);
            }
          })
          .catch(error => {
            console.log(error.name);
          });
      }
    })
  }),500}
const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);


refs.formEl.addEventListener('submit', onSubmit)
refs.loadMoreBtn.addEventListener('click', onLoadMore)
function onSubmit(e) {
  e.preventDefault();
 
  observer.unobserve(refs.sentinel);
  newApi.query = refs.formEl.elements.searchQuery.value.trim();
  if (newApi.query === ``) {
    Notiflix.Notify.failure('please enter search request');
    return;
  }
  observer.observe(refs.sentinel);
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
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 0.3,
    behavior: "smooth",
  });
}
function clealMarkup() {
  refs.photoContainer.innerHTML = '';
}
