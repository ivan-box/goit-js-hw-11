const URL = 'https://restcountries.com/v3.1/name';
import Notiflix from 'notiflix';

const FILTER_RESPONSE = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${FILTER_RESPONSE}`)
    .then(response => {
      if (response.status === 404) {
        Notiflix.Notify.warning('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
