const gallery = document.querySelector('.gallery');

export function createMarkup(images) {
  const markup = images
    .map(
      img =>
        `<li class="photo-card"><a href=${img.largeImageURL} class="gallery-item">
  <div class="contain"><img src=${img.webformatURL} alt="${img.tags}" width="100%" height="100%" loading="lazy"/></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${img.comments}    
    </p>
    <p class="info-item">
      <b>Downloads</b> ${img.downloads}
    </p>
  </div>
</a></li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
