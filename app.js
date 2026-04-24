// VibeSpotify - Music Player JavaScript

// Music Data (simulated - in real app would come from API)
const albumArtworks = [
    { id: 1, title: "Midnight Vibes", artist: "Luna", image: "https://picsum.photos/seed/album1/300", genre: "Lo-Fi" },
    { id: 2, title: "Summer Heat", artist: "The Waves", image: "https://picsum.photos/seed/album2/300", genre: "Pop" },
    { id: 3, title: "Neon Dreams", artist: "Cyber Collective", image: "https://picsum.photos/seed/album3/300", genre: "Electronic" },
    { id: 4, title: "Acoustic Sessions", artist: "Mountain Sound", image: "https://picsum.photos/seed/album4/300", genre: "Folk" },
    { id: 5, title: "Bass Drop", artist: "DJ Thunder", image: "https://picsum.photos/seed/album5/300", genre: "EDM" },
    { id: 6, title: "Smooth Jazz", artist: "Blue Note Ensemble", image: "https://picsum.photos/seed/album6/300", genre: "Jazz" },
    { id: 7, title: "Rock Classics", artist: "The Storms", image: "https://picsum.photos/seed/album7/300", genre: "Rock" },
    { id: 8, title: "Chillout", artist: "Ocean Breeze", image: "https://picsum.photos/seed/album8/300", genre: "Ambient" },
    { id: 9, title: "Hip Hop Beats", artist: "Street Sound", image: "https://picsum.photos/seed/album9/300", genre: "Hip Hop" },
    { id: 10, title: "Classical Moods", artist: "Symphony", image: "https://picsum.photos/seed/album10/300", genre: "Classical" },
    { id: 11, title: "Indie Spirit", artist: "The Wanderers", image: "https://picsum.photos/seed/album11/300", genre: "Indie" },
    { id: 12, title: "R&B Nights", artist: "Soul Collective", image: "https://picsum.photos/seed/album12/300", genre: "R&B" },
];

const artists = [
    { id: 1, name: "Luna", image: "https://picsum.photos/seed/artist1/300" },
    { id: 2, name: "The Waves", image: "https://picsum.photos/seed/artist2/300" },
    { id: 3, name: "Cyber Collective", image: "https://picsum.photos/seed/artist3/300" },
    { id: 4, name: "Mountain Sound", image: "https://picsum.photos/seed/artist4/300" },
    { id: 5, name: "DJ Thunder", image: "https://picsum.photos/seed/artist5/300" },
    { id: 6, name: "Blue Note Ensemble", image: "https://picsum.photos/seed/artist6/300" },
];

const playlists = [
    { id: 1, name: "Liked Songs", image: "https://picsum.photos/seed/liked/60", type: "playlist" },
    { id: 2, name: "Discover Weekly", image: "https://picsum.photos/seed/discover/60", type: "playlist" },
    { id: 3, name: "Release Radar", image: "https://picsum.photos/seed/release/60", type: "playlist" },
    { id: 4, name: "On Repeat", image: "https://picsum.photos/seed/repeat/60", type: "playlist" },
    { id: 5, name: "Shuffle Play", image: "https://picsum.photos/seed/shuffle/60", type: "playlist" },
    { id: 6, name: "Chill Mix", image: "https://picsum.photos/seed/chill/60", type: "playlist" },
    { id: 7, name: "Workout Energy", image: "https://picsum.photos/seed/workout/60", type: "playlist" },
    { id: 8, name: "Focus Flow", image: "https://picsum.photos/seed/focus/60", type: "playlist" },
];

// Player State
let currentTrack = null;
let isPlaying = false;
let isShuffled = false;
let isLooping = false;
let volume = 70;
let currentTime = 0;
let duration = 185;
let progressInterval = null;

// DOM Elements
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const volumeLevel = document.getElementById('volumeLevel');
const trackImage = document.getElementById('trackImage');
const trackName = document.getElementById('trackName');
const artistName = document.getElementById('artistName');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const likeBtn = document.querySelector('.like-btn');
const offlineIndicator = document.getElementById('offlineIndicator');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupNavigation();
    initializePlayer();
    populateContent();
    registerServiceWorker();
    setupOfflineDetection();
});

// App Initialization
function initializeApp() {
    // Set time
    updateGreeting();
    
    // Load saved state from localStorage
    loadPlayerState();
}

// Update Greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'Morning';
    else if (hour < 18) greeting = 'Afternoon';
    else greeting = 'Evening';
    
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = `Good ${greeting}`;
    }
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update page
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(`${page}Page`).classList.add('active');
        });
    });
}

// Initialize Player
function initializePlayer() {
    // Play/Pause button
    playBtn.addEventListener('click', togglePlay);
    
    // Progress bar click
    progressContainer.addEventListener('click', seekTo);
    
    // Volume
    document.querySelector('.volume-container').addEventListener('click', adjustVolume);
    
    // Like button
    likeBtn.addEventListener('click', toggleLike);
    
    // Shuffle
    document.querySelector('.shuffle-btn').addEventListener('click', toggleShuffle);
    
    // Previous/Next
    document.querySelector('.prev-btn').addEventListener('click', previousTrack);
    document.querySelector('.next-btn').addEventListener('click', nextTrack);
    
    // Repeat
    document.querySelector('.repeat-btn').addEventListener('click', toggleRepeat);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// Toggle Play
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();
    
    if (isPlaying) {
        startProgress();
    } else {
        stopProgress();
    }
}

// Update Play Button
function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Start Progress
function startProgress() {
    stopProgress();
    progressInterval = setInterval(() => {
        currentTime += 1;
        if (currentTime >= duration) {
            if (isLooping) {
                currentTime = 0;
            } else {
                nextTrack();
            }
        }
        updateProgress();
    }, 1000);
}

// Stop Progress
function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
    }
}

// Update Progress
function updateProgress() {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    timeCurrent.textContent = formatTime(currentTime);
    timeTotal.textContent = formatTime(duration);
}

// Seek To
function seekTo(e) {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    currentTime = percent * duration;
    updateProgress();
}

// Adjust Volume
function adjustVolume(e) {
    const rect = document.querySelector('.volume-container').getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    volume = Math.max(0, Math.min(100, percent * 100));
    volumeLevel.style.width = `${volume}%`;
    savePlayerState();
}

// Toggle Like
function toggleLike() {
    likeBtn.classList.toggle('liked');
    const icon = likeBtn.querySelector('i');
    if (likeBtn.classList.contains('liked')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// Toggle Shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    document.querySelector('.shuffle-btn').classList.toggle('active');
    document.querySelector('.shuffle-btn').style.color = isShuffled ? 'var(--primary)' : '';
}

// Toggle Repeat
function toggleRepeat() {
    isLooping = !isLooping;
    document.querySelector('.repeat-btn').classList.toggle('active');
    document.querySelector('.repeat-btn').style.color = isLooping ? 'var(--primary)' : '';
}

// Previous Track
function previousTrack() {
    currentTime = 0;
    updateProgress();
}

// Next Track
function nextTrack() {
    currentTime = 0;
    if (isShuffled) {
        playRandomTrack();
    }
    updateProgress();
}

// Play Random Track
function playRandomTrack() {
    const track = albumArtworks[Math.floor(Math.random() * albumArtworks.length)];
    if (currentTrack && track.id === currentTrack.id) {
        playRandomTrack();
    } else {
        loadTrack(track);
    }
}

// Load Track
function loadTrack(track) {
    currentTrack = track;
    trackImage.querySelector('img').src = track.image;
    trackName.textContent = track.title;
    artistName.textContent = track.artist;
    duration = 185 + Math.floor(Math.random() * 180);
    currentTime = 0;
    updateProgress();
}

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Handle Keyboard
function handleKeyboard(e) {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            currentTime = Math.max(0, currentTime - 5);
            updateProgress();
            break;
        case 'ArrowRight':
            currentTime = Math.min(duration, currentTime + 5);
            updateProgress();
            break;
        case 'ArrowUp':
            volume = Math.min(100, volume + 10);
            volumeLevel.style.width = `${volume}%`;
            break;
        case 'ArrowDown':
            volume = Math.max(0, volume - 10);
            volumeLevel.style.width = `${volume}%`;
            break;
    }
}

// Populate Content
function populateContent() {
    populateMixes();
    populateArtists();
    populateRecent();
    populatePlaylists();
}

// Populate Mixes
function populateMixes() {
    const grid = document.getElementById('mixesGrid');
    if (!grid) return;
    
    grid.innerHTML = albumArtworks.slice(0, 8).map(album => `
        <div class="card" onclick="playTrack(${album.id})">
            <div class="card-image">
                <img src="${album.image}" alt="${album.title}">
                <button class="play-button"><i class="fas fa-play"></i></button>
            </div>
            <div class="card-title">${album.title}</div>
            <div class="card-subtitle">${album.artist}</div>
        </div>
    `).join('');
}

// Populate Artists
function populateArtists() {
    const grid = document.getElementById('artistGrid');
    if (!grid) return;
    
    grid.innerHTML = artists.map(artist => `
        <div class="artist-card">
            <img src="${artist.image}" alt="${artist.name}">
            <div class="card-title">${artist.name}</div>
            <div class="card-subtitle">Artist</div>
        </div>
    `).join('');
}

// Populate Recent
function populateRecent() {
    const grid = document.getElementById('recentGrid');
    if (!grid) return;
    
    grid.innerHTML = albumArtworks.slice(4, 12).map(album => `
        <div class="card" onclick="playTrack(${album.id})">
            <div class="card-image">
                <img src="${album.image}" alt="${album.title}">
                <button class="play-button"><i class="fas fa-play"></i></button>
            </div>
            <div class="card-title">${album.title}</div>
            <div class="card-subtitle">${album.artist}</div>
        </div>
    `).join('');
}

// Populate Playlists
function populatePlaylists() {
    const list = document.getElementById('playlistList');
    if (!list) return;
    
    list.innerHTML = playlists.map(p => `
        <div class="playlist-item">${p.name}</div>
    `).join('');
    
    const libContent = document.getElementById('libraryContent');
    if (libContent) {
        libContent.innerHTML = playlists.map(p => `
            <div class="library-item">
                <img src="${p.image}" alt="${p.name}">
                <div class="library-item-info">
                    <div class="library-item-name">${p.name}</div>
                    <div class="library-item-meta">Playlist • ${Math.floor(Math.random() * 50) + 5} songs</div>
                </div>
            </div>
        `).join('');
    }
}

// Play Track (global function)
window.playTrack = function(id) {
    const track = albumArtworks.find(a => a.id === id);
    if (track) {
        loadTrack(track);
        isPlaying = true;
        updatePlayButton();
        startProgress();
    }
};

// Save Player State
function savePlayerState() {
    const state = {
        volume,
        isShuffled,
        isLooping
    };
    localStorage.setItem('vibeSpotifyState', JSON.stringify(state));
}

// Load Player State
function loadPlayerState() {
    const saved = localStorage.getItem('vibeSpotifyState');
    if (saved) {
        const state = JSON.parse(saved);
        volume = state.volume || 70;
        isShuffled = state.isShuffled || false;
        isLooping = state.isLooping || false;
        
        volumeLevel.style.width = `${volume}%`;
        
        if (isShuffled) {
            document.querySelector('.shuffle-btn').classList.add('active');
            document.querySelector('.shuffle-btn').style.color = 'var(--primary)';
        }
        
        if (isLooping) {
            document.querySelector('.repeat-btn').classList.add('active');
            document.querySelector('.repeat-btn').style.color = 'var(--primary)';
        }
    }
    
    // Load first track
    if (albumArtworks.length > 0) {
        loadTrack(albumArtworks[0]);
    }
}

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    }
}

// Offline Detection
function setupOfflineDetection() {
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            offlineIndicator.classList.add('show');
        } else {
            offlineIndicator.classList.remove('show');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}

// Export for debugging
window.vibeSpotify = {
    albumArtworks,
    artists,
    playlists,
    playTrack: window.playTrack
};