import axios from 'axios';

// BASE DA URL: https://api.themoviedb.org/3
// URL DA API: /movie/now_playing?api_key=a409115261eb98a08aa6f06fb909e3f6&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;