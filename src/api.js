import axios from 'axios';

const API_KEY = 'VsGU4hzmDlUjNG54BzwffYQwRrEFbn9Dt3M3rHtAT68'
const BASE_URL = 'https://api.unsplash.com';

const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 16,
      client_id: API_KEY,
    },
  });

  return response.data;
};

export default fetchImages;