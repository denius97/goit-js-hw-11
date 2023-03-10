import axios from 'axios';
export async function fetchImages(req, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '34243100-4e91bc29f0d933fda9b3d0a50',
      q: req,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };

  const resp = await axios.get(`${BASE_URL}`, options);
  return resp;
}
