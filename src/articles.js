export default function renderArticles(images) {
  return images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => {
        return `
        <li>
          <a class="gallery-link" href="${largeImageURL}">
            <div class="photo">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="thumb">
                <p class="thumb__text"><b>❤️ Likes :</b> ${likes} </p>
                <p class="thumb__text"><b>👀 Views :</b> ${views} </p>
                <p class="thumb__text"><b>🖇 Comments :</b> ${comments} </p>
                <p class="thumb__text"><b>📩 Downloads :</b>  ${downloads} </p>
              </div>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');
}