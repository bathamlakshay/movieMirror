# 🎬 MovieMirror

A production-level movie discovery app built with React.js and TMDB API.

![MovieMirror](https://moviemirrorapp.netlify.app)

## 🚀 Live Demo

👉 [moviemirrorapp.netlify.app](https://moviemirrorapp.netlify.app)

## ✨ Features

- 🎯 **Trending movies** displayed on homepage load — no empty screen
- 🔍 **Debounced search** — optimized API calls while typing
- 🎭 **Genre filtering** — filter movies by Action, Comedy, Drama, Horror and more
- 🎬 **YouTube trailer** embedded on movie detail page
- 🎥 **Similar movies** section on every detail page
- ❤️ **Favourites** — save movies with automatic localStorage persistence
- 💀 **Skeleton loading** — Netflix-style loading placeholders
- 📱 **Fully responsive** — works on mobile, tablet and desktop
- 🎨 **Cinematic UI** — dark theme with hero banner and smooth animations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| Zustand | Global state management |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| TMDB API | Movie data, posters, trailers |
| Vite | Build tool |
| Netlify | Deployment |

## ⚡ Performance Optimizations

- `useMemo` — prevents unnecessary recalculations on re-renders
- `useCallback` — memoizes event handlers
- `useDebounce` — custom hook that limits API calls while user types
- Skeleton screens — improves perceived performance
- Lazy image loading — faster initial page load

## 📁 Project Structure
