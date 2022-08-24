import axios from 'axios';
import Notiflix from 'notiflix';

// const FILTER_RESPONSE = 'q,image_type=photo,orientation,safesearch=true';
// const baseURL = 'https://pixabay.com/api/';
// const KEY = '29479728-a98d2355de22f92bb93dea3e0';

/*
`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
*/

// export async function fetchCountries() {
//   try {
//     const response = await axios.get(
//       `${baseURL}?key=${KEY}&${FILTER_RESPONSE}`
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     // if (response.status === 404) {
//     //   Notiflix.Notify.warning('Oops, there is no country with that name');
//     // }
//   }
// }
export async function getImage(inputValue) {
  let options = {
    params: {
      key: '29479728-a98d2355de22f92bb93dea3e0',
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    },
  };
  const response = await axios.get('https://pixabay.com/api/', options);
  return response.data;
}
