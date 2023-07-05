import axios from 'axios';

const KEY = '36560176-389977c64a520682aab26cdb9';

const URL = `https://pixabay.com/api/`;

const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export { fetchImages };
