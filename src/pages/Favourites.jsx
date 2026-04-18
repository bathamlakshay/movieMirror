import useFavouriteStore from '../stores/FavouriteStore'
import { useNavigate } from 'react-router-dom'
import { IMG_BASE_URL } from '../services/Api'

function Favourites() {
    const navigate = useNavigate()
    const {favourites, removeFavourite} = useFavouriteStore()


    return (
         <div className="bg-gray-950 min-h-screen px-8 py-25">

      <h1 className="text-white text-2xl font-bold mb-2">
        Your Favourites
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        {favourites.length} {favourites.length === 1 ? 'movie' : 'movies'} saved
      </p>

      {/* Empty state */}
      {favourites.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-5xl">🎬</p>
          <p className="text-gray-400 text-lg">No favourites yet</p>
          <p className="text-gray-600 text-sm">Go explore and add some movies!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-purple-700 mt-2">
            Browse Movies
          </button>
        </div>
      )}

      {/* Favourites grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favourites.map(movie => (
          <div key={movie.id} className="group relative">

            {/* Movie card */}
            <div
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="cursor-pointer">
              <div className="rounded-xl overflow-hidden mb-2 aspect-[2/3]">
                {movie.poster_path ? (
                  <img
                    src={`${IMG_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                    No poster
                  </div>
                )}
              </div>
              <p className="text-white text-sm font-medium truncate">{movie.title}</p>
              <p className="text-yellow-400 text-xs">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>
              <p className="text-gray-600 text-xs">
                {movie.release_date?.split('-')[0]}
              </p>
            </div>

            {/* Remove button - shows on hover */}
            <button
              onClick={() => removeFavourite(movie.id)}
              className="absolute top-2 right-2 bg-red-900/80 text-red-300 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-800">
              Remove
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Favourites