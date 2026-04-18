# 🎬 MovieMirror

A production-level movie discovery app built with React.js and TMDB API.

<img width="1910" height="917" alt="image" src="https://github.com/user-attachments/assets/928b6d74-3190-45c9-bd7c-ccee80bd33de" />



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

src/
├── components/        # Reusable UI components
│   ├── SkeletonCard.jsx
│   └── SkeletonGrid.jsx
├── pages/             # Route pages
│   ├── Home.jsx
│   ├── MovieDetail.jsx
│   └── Favourites.jsx
├── stores/            # Zustand state management
│   ├── movieStore.js
│   └── favouriteStore.js
├── services/          # API layer
│   └── api.js
├── hooks/             # Custom React hooks
│   └── useDebounce.js
└── utils/             # Helper functions

## 🔧 Run Locally

1. Clone the repo
```bash
git clone https://github.com/bathamlakshay/movie-search-app.git
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root
```bash
VITE_TMDB_API_KEY=your_tmdb_key_here
```

4. Start development server
```bash
npm run dev
```

## 📸 Screenshots

### Homepage
<img width="1910" height="917" alt="image" src="https://github.com/user-attachments/assets/5c059052-83c9-467d-a1d1-bda31d1e4331" />


### Movie Detail
<img width="1919" height="897" alt="image" src="https://github.com/user-attachments/assets/d2746118-7fb3-47aa-a132-d9ade1ba88b4" />


### Favourites
<img width="1905" height="898" alt="image" src="https://github.com/user-attachments/assets/9bf65816-4a79-40ae-8e6c-97b1461a3126" />



## 🙏 Credits

- Movie data provided by [TMDB API](https://www.themoviedb.org)
- Icons by [Lucide React](https://lucide.dev)

## 👨‍💻 Author

**Lakshay Batham**
- LinkedIn: www.linkedin.com/in/lakshaybathamb27082262
- GitHub: [@bathamlakshay](https://github.com/bathamlakshay)
