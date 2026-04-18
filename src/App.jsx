import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Home, Heart, Search, X, Film, Menu } from 'lucide-react'
import useMovieStore from './stores/movieStore'
import useDebounce from './hooks/useDebounce'

function App() {
  const navigate = useNavigate()
  const { search } = useMovieStore()
  const [searchInput, setSearchInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 500)

  useEffect(() => {
    if (debouncedSearch.trim().length > 2) {
      search(debouncedSearch)
      navigate('/')
    }
  }, [debouncedSearch])

  const handleSearch = useCallback(() => {
    if (searchInput.trim().length > 0) {
      search(searchInput)
      navigate('/')
    }
  }, [searchInput])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSearch()
  }, [handleSearch])

  const clearSearch = useCallback(() => {
    setSearchInput('')
  }, [])

  // close sidebar when route changes on mobile
  const handleNavClick = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-950">

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div className={`
        fixed h-full z-30 flex flex-col
        bg-gray-950/90 border-r border-gray-800/50
        transition-transform duration-300
        w-60 min-w-[240px]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>

        {/* Logo */}
        <div className="px-4 lg:px-8 py-4 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10.5 rounded-lg flex items-center justify-center">
              <Film size={20} className="text-white mt-0.5" />
            </div>
            <h1 className="text-white text-lg font-bold">MovieMirror</h1>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <p className="text-gray-600 text-xs font-medium px-4 mb-2 uppercase tracking-wider">
            Menu
          </p>

          <NavLink
            to="/"
            end
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? ' text-white font-medium shadow-lg shadow-purple-900/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/favourites"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? ' text-white font-medium shadow-lg shadow-purple-900/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }>
            <Heart size={18} />
            Favourites
          </NavLink>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-xs">MovieMirror</p>
            <p className="text-gray-600 text-xs">v2.0 · Powered by TMDB</p>
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">

        {/* ── TOP HEADER ── */}
        <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 px-4 lg:px-8 py-4 flex items-center gap-4">

          {/* Hamburger menu - only on mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white">
            <Menu size={22} />
          </button>

          {/* Search bar */}
          <div className="flex-1 flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 gap-3 focus-within:border-purple-500 transition-colors">
            <Search size={16} className="text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search movies, shows..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
            />
            {searchInput && (
              <button onClick={clearSearch}>
                <X size={14} className="text-gray-500 hover:text-white transition-colors" />
              </button>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-4 lg:px-6 py-2.5 rounded-xl text-sm font-medium transition-all">
            Search
          </button>

        </div>

        {/* ── PAGE CONTENT ── */}
        <div className="flex-1">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default App