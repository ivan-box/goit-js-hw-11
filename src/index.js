import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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
}) => `<li class="country-info">
        <img class="flag" src="${svg}" alt="National Flag" width='210' height='140' >
        <h2 class="country-title">${common}</h2>
        <p class="country-text"><b>Capital:</b> ${capital}</p>
        <p class="country-text"><b>Population:</b> ${population}</p>
        <p class="country-text"><b>Languages:</b>  ${Object.values(
          languages
        )}</p>
    </li>`;
const paintMarkup1 = ({ flags: { svg }, name: { common } }) => {
  return `<li class="country-info">
        <img class="flag" src="${svg}" alt="National Flag" width='210' height='140' >
        <h2 class="country-title">${common}</h2>
         </li>`;
};

function onFindCountryInput(e) {
  countryEl.innerHTML = '';
  if (e.target.value.trim() !== '') {
    fetchCountries(e.target.value).then(data => {
      if (data.length <= 10 && data.length > 1) {
        return (countryEl.innerHTML = data.map(paintMarkup1).join(''));
      }
      if (data.length === 1) {
        return (countryEl.innerHTML = data.map(paintMarkup).join(''));
      }
      if (data.length === '') {
        return (countryEl.innerHTML = '');
      }
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    });
  }
}
