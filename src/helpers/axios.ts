import axios from 'axios';

export const customAxios = axios.create({
  // baseURL: "https://api.empregourgente.com",
  baseURL: "http://localhost:3000",
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
