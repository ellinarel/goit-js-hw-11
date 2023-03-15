import { fetchImages } from "./fetchimages";

const refs = {
    formEl : document.querySelector('.search-form')
}

refs.formEl.addEventListener(`submit`, onSubmit)
function onSubmit(e){
    e.preventDefault();
    const searchValue = refs.formEl.elements.searchQuery.value.trim();
    fetchImages(searchValue)
    .then((response) => {
      console.log(response.data);
    })
}