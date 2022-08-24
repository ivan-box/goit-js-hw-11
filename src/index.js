import './css/styles.css';
import { getImage } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
inputForm.addEventListener('submit', onClickSubmitBtn);
loadMoreBtn.addEventListener('click', onBtnLoadMore);
// const submitBtn = document.querySelector('[type="submit"]');
const gallery = new simpleLightbox('.gallery a');
let currentPage = 1;

async function onClickSubmitBtn(e) {
  e.preventDefault();
  currentPage = 1;
  const inputValue = inputForm.elements.searchQuery.value;
  if (inputValue === '') {
    return Notiflix.Notify.failure('Vvedite Svoi Zapros');
  }

  const response = await getImage(inputValue);
  // console.log(response.hits);
  markup(response.hits);
  gallery.refresh();
  // loadMoreBtn.hidden = false;
  loadMoreBtn.removeAttribute('hidden');

  return response;
}
async function onBtnLoadMore() {
  loadMoreBtn.disabled = true;
  loadMoreBtn.hidden = true;
  const inputValue = inputForm.elements.searchQuery.value;
  currentPage += 1;
  const response = await getImage(inputValue, currentPage);
  markup(response.hits);
  gallery.refresh();
  loadMoreBtn.disabled = false;
  loadMoreBtn.hidden = false;
}

function markup(result) {
  result.map(item => {
    const {
      // id,
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;
    galleryBox.innerHTML += `<a class="photo-link" href="${largeImageURL}"><div class="photo-card">
  <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div></a>`;
  });
}
