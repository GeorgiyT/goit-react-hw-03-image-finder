import axios from "axios";

const PER_PAGE = 12;

const fetchPictures = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=21145461-ec858c83a87163ad119fff078&q=${query}&page=${page}&per_page=${PER_PAGE}`
  );
};

export default fetchPictures;
