# 🎵 VibeSpotify - Music Player

A beautiful, fully-featured Spotify clone with an amazing UI, built with vanilla HTML, CSS, and JavaScript. Works offline as a PWA!

![VibeSpotify Preview](https://picsum.photos/seed/preview/800/400)

## ✨ Features

### 🎨 Beautiful UI
- Dark theme with Spotify-inspired design
- Smooth animations and transitions
- Fully responsive (mobile + desktop)
- Gradient backgrounds and card hover effects

### 🎧 Music Player
- Full playback controls (play/pause, next, previous)
- Progress bar with seek functionality
- Volume control
- Shuffle and repeat modes
- Like/save songs
- Keyboard shortcuts (Space, Arrow keys)

### 💾 Offline Support (PWA)
- Service Worker for offline caching
- Install as native app
- Works without internet
- Offline indicator

### 📱 Multiple Pages
- **Home**: Personalized mixes, featured artists, recently played
- **Search**: Browse by category
- **Your Library**: Playlists and saved content

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/shashwatsharma076-create/Spotify-Clone.git

# Open in browser
cd Spotify-Clone
# Just open index.html in your browser
```

Or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|-------|
| Space | Play/Pause |
| ← | Rewind 5s |
| → | Forward 5s |
| ↑ | Volume Up |
| ↓ | Volume Down |

## 📂 Project Structure

```
Spotify-Clone/
├── index.html      # Main HTML
├── style.css       # All styles
├── app.js         # JavaScript
├── sw.js          # Service Worker (offline)
├── manifest.json  # PWA Manifest
└── README.md     # This file
```

## 🎯 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling, grid, flexbox, animations
- **JavaScript** - Vanilla JS (no frameworks!)
- **Service Worker** - Offline caching
- **PWA** - Installable as app

## 🌟 Demo

Open index.html in browser to see:
- Greeting based on time of day
- Dynamic album cards with play buttons
- Working music player bar
- Smooth hover animations
- Offline mode indicator

## 📱 Responsive

Works great on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Customization

### Change Colors
Edit in `style.css`:
```css
:root {
    --primary: #1db954;       /* Green accent */
    --bg-dark: #121212;       /* Dark background */
    --bg-card: #181818;       /* Card background */
}
```

### Add More Albums
Edit `app.js`:
```javascript
const albumArtworks = [
    { id: 1, title: "New Album", artist: "Artist", image: "url" },
    // Add more...
];
```

## 📄 License

MIT License

---

Made with ❤️ for vibe coding enthusiasts!

If you like this project, give it a ⭐!