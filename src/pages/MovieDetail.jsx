import { useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieByid, getMovieVideos, getSimilarMovies, IMG_BASE_URL, IMG_ORIGINAL } from '../services/Api'
import useFavouriteStore from '../stores/FavouriteStore'

function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [trailer, setTrailer] = useState([])
    const [similar, setSimilar] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    // Favourites from Zustand store
    const  {addFavourite, removeFavourite, isFavourite } = useFavouriteStore()
    const alreadySaved = movie ? isFavourite(movie.id) : false
    
  
    useEffect(() => {
      const fetchAll = async () => {
        setLoading(true)
        try {
          const [details, videos, similarMovies] = await Promise.all([
            getMovieByid(id),
            getMovieVideos(id),
            getSimilarMovies(id)
          ])

          setMovie(details)
          setSimilar(similarMovies.results.slice(0,8))

          const officialTrailer = videos.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        setTrailer(officialTrailer)
            
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    
    fetchAll()
     
    },[id])

    const handleFavourites = () => {
        if (alreadySaved) {
            removeFavourite(movie.id)
        } else {
            addFavourite({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date 
            })
        }
    }

    if (loading) return <p className="text-white p-8">Loading...</p>
    if (error) return <p className="text-red-400 p-8">{error}</p>
    if(!movie) return null

      return (
    <div className="bg-gray-950 min-h-screen">

      {/* ── BACKDROP HERO ── */}
      <div className="relative h-72 overflow-hidden rounded-2xl">
        <img
          src={`${IMG_ORIGINAL}${movie.backdrop_path}`}
          alt={movie.title}

          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent " />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-15 left-15 text-white  px-4 py-2 rounded-lg text-sm hover:bg-black/70 ">
          ← Back
        </button>
      </div>

      <div className="px-8 -mt-20 relative z-10">

        {/* ── MOVIE INFO ── */}
        <div className="flex gap-6 mb-8">
          {/* Poster */}
          <img
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-70 rounded-xl border-2 border-gray-800 shadow-xl flex-shrink-0"
          />

          {/* Details */}
          <div className="pt-24">
            <h1 className="text-white text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 text-sm mb-2">
              {movie.release_date?.split('-')[0]} • {movie.genres?.map(g => g.name).join(', ')} • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
            <p className="text-yellow-400 mb-4">⭐ {movie.vote_average?.toFixed(1)} / 10</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Favourite button */}
            <button
              onClick={handleFavourites}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                alreadySaved
                  ? 'bg-red-900 text-red-300 hover:bg-red-800'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}>
              {alreadySaved ? '✕ Remove from Favourites' : '+ Add to Favourites'}
            </button>
          </div>
        </div>

        {/* ── TRAILER ── */}
        {trailer && (
          <div className="mb-8 justify-center">
            <h1 className="text-white text-xl font-bold mb-4">Official Trailer</h1>
            <div className="rounded-xl overflow-hidden aspect-video w-full h-[50vh]">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="trailer"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* ── SIMILAR MOVIES ── */}
        {similar.length > 0 && (
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4">Similar Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {similar.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="cursor-pointer group">
                  <div className="rounded-lg overflow-hidden mb-1 aspect-[2/3]">
                    {movie.poster_path ? (
                      <img
                        src={`${IMG_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
                        No poster
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MovieDetail