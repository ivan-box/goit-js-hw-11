import axios from 'axios';
import Notiflix from 'notiflix';

export async function getImage(inputValue, currentPage = 1) {
  let options = {
    params: {
      key: '29479728-a98d2355de22f92bb93dea3e0',
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 40,
    },
  };
  // if ((response.data.hits === '')) {
  //   return Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }
  // if ((response.data.hits.length === 0)) {
  //
  // }

  const response = await axios.get('https://pixabay.com/api/', options);
  return response.data;
}
