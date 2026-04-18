import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useMovieStore from "../stores/movieStore";
import { IMG_BASE_URL } from "../services/api";
import SkeletonGrid from "../components/SkeletonGrid";

function Home() {
  const navigate = useNavigate();

  const {
    trending, popular, topRated, searchResults,
    searchLoading, loading, genres, selectedGenre,
    error, fetchGenres, fetchHomeData, searchQuery, fetchByGenre
  } = useMovieStore();

  useEffect(() => {
    fetchHomeData();
    fetchGenres();
  }, []);

  const popularMovies = useMemo(() => popular.slice(0, 10), [popular])
  const topRatedMovies = useMemo(() => topRated.slice(0, 10), [topRated])
  const filteredSearch = useMemo(() => searchResults.slice(0, 20), [searchResults])

  if (error) return <p className="text-red-400 p-8">{error}</p>

  const heroMovie = trending[0]

  // reusable movie card
  const MovieCard = ({ movie }) => (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="cursor-pointer group">
      <div className="rounded-xl overflow-hidden mb-2 aspect-[2/3]">
        {movie.poster_path ? (
          <img
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
            No poster
          </div>
        )}
      </div>
      <p className="text-white text-xs lg:text-sm font-medium truncate">{movie.title}</p>
      <p className="text-yellow-400 text-xs">⭐ {movie.vote_average?.toFixed(1)}</p>
    </div>
  )

  return (
    <div className="bg-gray-950 min-h-screen">

      {/* ── HERO BANNER ── */}
      {heroMovie && (
        <div className="relative h-56 lg:h-79 overflow-hidden w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute bottom-6 lg:bottom-10 left-4 lg:left-12 max-w-xs lg:max-w-lg z-10">
            <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full mb-3 inline-block">
              Trending this week
            </span>
            <h1 className="text-white text-xl lg:text-4xl font-bold mb-2">
              {heroMovie.title}
            </h1>
            <p className="text-gray-300 text-xs lg:text-sm line-clamp-2 mb-4 hidden lg:block">
              {heroMovie.overview}
            </p>
            <button
              onClick={() => navigate(`/movie/${heroMovie.id}`)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* ── GENRE TABS ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 lg:px-9 py-5 mt-4 bg-gray-950 border-b border-gray-800/50">
        <button
          onClick={() => fetchHomeData()}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
            selectedGenre === null
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}>
          All
        </button>
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => fetchByGenre(genre.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
              selectedGenre === genre.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}>
            {genre.name}
          </button>
        ))}
      </div>

      <div className="px-4 lg:px-8 py-6">

        {/* ── SEARCH RESULTS ── */}
        {searchQuery && (
          <div className="mb-10">
            <h2 className="text-white text-lg lg:text-xl font-bold mb-4">
              Search Results
            </h2>
            {searchLoading ? (
              <SkeletonGrid count={10} />
            ) : searchResults.length === 0 ? (
              <p className="text-gray-400 text-sm">No movies found for "{searchQuery}"</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
                {filteredSearch.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── POPULAR SECTION ── */}
        <h2 className="text-white text-lg lg:text-xl font-bold mb-4">
          Popular Movies
        </h2>
        {loading ? (
          <SkeletonGrid count={10} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 mb-10">
            {popularMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* ── TOP RATED SECTION ── */}
        <h2 className="text-white text-lg lg:text-xl font-bold mb-4">
          Top Rated
        </h2>
        {loading ? (
          <SkeletonGrid count={10} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {topRatedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Home