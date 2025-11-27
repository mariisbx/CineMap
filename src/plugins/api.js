import axios from "axios";

export const TMDBapi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQ5MDY1MzdiZDUxN2Q0YzRlNjI3YmVlNmYwZmJiMCIsIm5iZiI6MTc1OTQ0Mzc0Mi4zODIwMDAyLCJzdWIiOiI2OGRlZmIxZTBkYjJjNDdmMmUzYjhhMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WdZxeGJU4JZyVewsfZW2SFxSW--WQHb3tMg5jqXarxA`
  },
  params: {
    language: "pt-BR"
  }
});

export const MapAPI = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/",
  headers: {
    "Accept-Language": "pt-BR",
    "User-Agent": "CineMap/1.0"
  },
  params: {
    format: "json"
  }
});

TMDBapi.interceptors.response.use(
  r => r,
  e => Promise.reject(e)
);

MapAPI.interceptors.response.use(
  r => r,
  e => Promise.reject(e)
);

export default {
  TMDBapi,
  MapAPI
};
