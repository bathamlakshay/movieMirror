import { useNavigate } from 'react-router-dom'

function MovieCard({title, year, poster, type, imdbID}){
    const navigate = useNavigate()

return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 cursor-pointer hover:scale-105 transition-transform"

    onClick={() => navigate(`/movie/${imdbID}`)}>
        

   {poster !== 'N/A' ? (
    <img src={`https://wsrv.nl/?url=${poster}`} alt={title}className="w-full h-64 object-cover pointer-events-none"
    

    />
   ) : (
    <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
        no poster
    </div>
     )}

     <div className="p-3">
        <h3 className="text-white font-medium text-sm truncate">{title}</h3>
        <p className="text-gray-500 text-xs mt-1">{year}</p>
        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full mt-2 inline-block">{type}</span>
     </div>

    </div>
)

}

export default MovieCard