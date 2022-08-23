import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Block } from 'notiflix/build/notiflix-block-aio';
// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');
const countryEl = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

const inputFields = document.querySelector('#search-box');
inputFields.addEventListener(
  'input',
  debounce(onFindCountryInput, DEBOUNCE_DELAY)
);

const paintMarkup = ({
  flags: { svg },
  name: { common },
  population,
  capital,
  languages,
}) => {
  return `<li class="country-info">
        <img class="flag" src="${svg}" alt="National Flag" width='240' height='160' >
        <h2 class="country-title">${common}</h2>
        <p class="country-text"><b>Capital:</b> ${capital}</p>
        <p class="country-text"><b>Population:</b> ${population}</p>
        <p class="country-text"><b>Languages:</b>  ${Object.values(
          languages
        )}</p>
    </li>`;
};
const paintMarkup1 = ({ flags: { svg }, name: { common } }) => {
  return `<li class="country-info">
        <img class="flag" src="${svg}" alt="National Flag" width='240' height='160' >
        <h2 class="country-title">${common}</h2>
         </li>`;
};

function onFindCountryInput(e) {
  fetchCountries(e.target.value)
    .then(data => data)
    .then(data => {
      // console.log(data.length);
      if (data.length < 10 && data.length > 1) {
        return (countryEl.innerHTML = data.map(paintMarkup1).join(''));
      } else if (data.length === 1) {
        return (countryEl.innerHTML = data.map(paintMarkup).join(''));
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    });
}
