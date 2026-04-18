import {create} from 'zustand'
import { persist } from 'zustand/middleware'

const useFavouriteStore = create(
    persist(
        (set, get) => ({

            favourites: [],

            addFavourite: (movie) => {
                const already = get().favourites.find(f => f.id === movie.id)
                if(already) return
                set(state => ({favourites: [...state.favourites,movie]}))
            },

            removeFavourite: (id) => {
                set(state => ({
                    favourites: state.favourites.filter(f => f.id !== id)
                }))
            },

            isFavourite: (id) => {
                return get().favourites.some(f => f.id === id)
            }

        }),
        {
            name: 'movie-favourites',
        }
    )
)
    

export default useFavouriteStore