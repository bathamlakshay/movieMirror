const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original'

const fetcher = async (endpoint) => {
  const url = endpoint.includes('?') 
    ? `${BASE_URL}${endpoint}&api_key=${TMDB_KEY}`
    : `${BASE_URL}${endpoint}?api_key=${TMDB_KEY}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API ERROR:", errorText)
      return null
    }

    const data = await response.json()
    return data

  } catch (err) {
    console.error("FETCH ERROR:", err)
    return null
  }
}

export const getTrending = () =>
    fetcher(`/trending/movie/week?language=en-US`)

export const getMoviesByCategory  = (category) =>
    fetcher(`/movie/${category}?language=en-US&page=1`)

export const searchMovies = (query) =>
    fetcher(`/search/movie?query=${query}&language=en-US&page=1`)

export const getMovieByid = (id) => 
    fetcher(`/movie/${id}?language=en-US`)

export const getMovieVideos = (id) => 
  fetcher(`/movie/${id}/videos?language=en-US`)

export const getSimilarMovies = (id) =>
    fetcher(`/movie/${id}/similar?language=en-US`)

export const getMovieCredits = (id) =>
  fetcher(`/movie/${id}/credits?language=en-US`)

export const getGenres = () =>
    fetcher(`/genre/movie/list?language=en-US`)

export const getMoviesByGenre = (genreId) =>
  fetcher(`/discover/movie?with_genres=${genreId}&language=en-US&page=1`)