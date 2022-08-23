const URL = 'https://restcountries.com/v3.1/name';
import Notiflix from 'notiflix';

/*
// const refs = {
//   name: name,
//   capital: capital,
//   population: population,
//   flags: flags,
//   languages: languages,
// };
const URL = 'https://restcountries.com/v3'
*/
const FILTER_RESPONSE = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${FILTER_RESPONSE}`)
    .then(response => response.json())
    .then(data => data)
    .catch(() => {
      if (e.target.value.trim() !== '') {
        Notiflix.Notify.warning('Memento te hominem esse');
      }
    });
}
