import { create } from 'zustand'
import { getTrending, getMoviesByCategory, searchMovies, getGenres, getMoviesByGenre} from '../services/Api'


const useMovieStore = create((set) => ({

    // DATA(STATE)
    trending: [],
    popular: [],
    topRated: [],
    searchResults: [],
    genres: [],
    selectedGenre: null,

    // UI-STATE
    loading: false,
    searchLoading: false,
    error: null,
    searchQuery: '',
    activeGenre: 'All',


    fetchTrending: async () => {
        set({loading: true, error: null})
        try {
            const data = await getTrending()
            set({ trending: data?.results || [], loading: false })
        } catch (err) {
            set({error: err.message, loading: false})
        }
    },

    fetchHomeData: async() => {
        set({loading: true, error: null, selectedGenre: null})
        try {
            const [trending, popular, topRated] = await Promise.all([
                getTrending(),
                getMoviesByCategory('popular'),
                getMoviesByCategory('top_rated'),
            ])
        set({
            trending: trending?.results || [],
            popular: popular?.results || [],
            topRated: topRated?.results || [],
            loading: false
        })
        
        } catch (err) {
            set({error: err.message, loading: false})
        }
    },

    search: async (query) =>{
        set({ searchLoading: true, error: null, searchQuery: query})
        try {
            const data = await searchMovies(query)
            set({searchResults: data?.results || [], searchLoading: false})
        } catch (err) {
            set({error: err.message, searchLoading:false})
        }
    },

    fetchGenres: async() => {
        try {
            const data = await getGenres()
            set({genres: data.genres})
        } catch (err) {
            console.log(err)
        }
    },

    fetchByGenre: async (genreId) => {
        set({ loading: true, selectedGenre: genreId})
        try {
            const data = await getMoviesByGenre(genreId)
            set({popular: data.results, loading: false})
        } catch (err) {
          set({ error: err.message, loading: false })
        }
    },
    
    
    
    setActiveGenre: (genre) => set({ activeGenre: genre }),


}))

export default useMovieStore