import './css/styles.css';
import { getImage } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// const gallery = document.querySelector('.gallery');

const inputForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');
inputForm.addEventListener('submit', onClickSubmitBtn);
// const submitBtn = document.querySelector('[type="submit"]');
// inputForm.addEventListener('input', onInputInForm);
// const DEBOUNCE_DELAY = 300;

// getImage();
async function onClickSubmitBtn(e) {
  e.preventDefault();
  const inputValue = inputForm.elements.searchQuery.value;
  // console.log(inputForm.elements.searchQuery.value);
  const response = await getImage(inputValue);
  console.log(response.hits);
  markup(response.hits);
  return response;
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

// const inputFields = document.querySelector('#search-box');
// inputFields.addEventListener(
//   'input',
//   debounce(onFindCountryInput, DEBOUNCE_DELAY)
// );

// const paintMarkup = ({
//   flags: { svg },
//   name: { common },
//   population,
//   capital,
//   languages,
// }) => `<li class="country-info">
//         <img class="flag" src="${svg}" alt="National Flag" width='210' height='140' >
//         <h2 class="country-title">${common}</h2>
//         <p class="country-text"><b>Capital:</b> ${capital}</p>
//         <p class="country-text"><b>Population:</b> ${population}</p>
//         <p class="country-text"><b>Languages:</b>  ${Object.values(
//           languages
//         )}</p>
//     </li>`;
// const paintMarkup1 = ({ flags: { svg }, name: { common } }) => {
//   return `<li class="country-info">
//         <img class="flag" src="${svg}" alt="National Flag" width='210' height='140' >
//         <h2 class="country-title">${common}</h2>
//          </li>`;
// };

// function onFindCountryInput(e) {
//   countryEl.innerHTML = '';
//   if (e.target.value.trim() !== '') {
//     fetchCountries(e.target.value).then(data => {
//       if (data.length <= 10 && data.length > 1) {
//         return (countryEl.innerHTML = data.map(paintMarkup1).join(''));
//       }
//       if (data.length === 1) {
//         return (countryEl.innerHTML = data.map(paintMarkup).join(''));
//       }
//       if (data.length === '') {
//         return (countryEl.innerHTML = '');
//       }
//       Notiflix.Notify.info(
//         'Too many matches found. Please enter a more specific name.'
//       );
//     });
//   }
// }
