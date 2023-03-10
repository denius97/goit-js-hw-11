import './css/styles.css';
import { fetchImages } from './js/fetchImages.js';
import { createMarkup } from './js/createMarkup.js';
import axios from 'axios';
// const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoadMore);

let page = 1;
let searchReques = '';

let simpleGallery = new SimpleLightbox('.gallery a');

function onSubmit(evt) {
  evt.preventDefault();
  if (!evt.target.searchQuery.value) {
    return Notify.failure('Can`t be empty.');
  }
  gallery.innerHTML = '';
  loadMore.classList.add('hidden');
  page = 1;
  searchReques = evt.target.searchQuery.value;
  evt.target.submit.disabled = true;
  console.log(evt.target.submit);
  fetchImages(evt.target.searchQuery.value, page)
    .then(({ data }) => {
      evt.target.submit.disabled = false;
      if (!data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (data.totalHits > data.hits.length) {
        loadMore.classList.remove('hidden');
      }

      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      createMarkup(data.hits);
      simpleGallery.refresh();
    })
    .catch(err => {
      console.error(err);
      Notify.failure(
        'Sorry, something went wrong. Check your connection and try again.'
      );
      evt.target.submit.disabled = false;
    });
}

function onLoadMore() {
  page += 1;
  loadMore.disabled = true;
  fetchImages(searchReques, page)
    .then(({ data }) => {
      if (data.totalHits / 40 <= page) {
        loadMore.classList.add('hidden');
        Notify.info("It's all.");
      }

      createMarkup(data.hits);
      simpleGallery.refresh();
      loadMore.disabled = false;
    })
    .catch(err => {
      console.error(err);
      Notify.failure(
        'Sorry, something went wrong. Check your connection and try again.'
      );
      loadMore.disabled = false;
    });
}
