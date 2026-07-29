/**
 * ================================================================
 * SOUNDWAVE — Premium Music Player
 * script.js
 *
 * Features:
 *   - Play / Pause / Next / Previous
 *   - Progress bar seek
 *   - Volume control & Mute
 *   - Shuffle / Repeat (none | all | one)
 *   - Playlist display & filtering
 *   - Favorites with Local Storage
 *   - Recently Played with Local Storage
 *   - Last-played song restore from Local Storage
 *   - Search (header & full-page)
 *   - Dark / Light theme toggle
 *   - Mini player
 *   - Keyboard shortcuts
 *   - Toast notifications
 *   - Album art rotation animation
 *   - Dynamic background blur
 *   - Responsive sidebar toggle
 * ================================================================
 */

'use strict';

/* ================================================================
   1. PLAYLIST DATA
   Add real audio files to assets/audio/ and update `src`.
   Cover images are in assets/images/.
================================================================ */
const songs = [
  {
    id: 1,
    title: 'Neon Dreams',
    artist: 'The Synthwave Collective',
    album: 'Retrowave Vol. 1',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'assets/images/cover1.png',
    duration: '3:48',
  },
  {
    id: 2,
    title: 'Midnight Soul',
    artist: 'Jazz & the City',
    album: 'After Hours',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'assets/images/cover2.png',
    duration: '4:12',
  },
  {
    id: 3,
    title: 'Electric Pulse',
    artist: 'DJ Nova',
    album: 'High Voltage',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'assets/images/cover3.png',
    duration: '3:22',
  },
  {
    id: 4,
    title: 'Golden Hour',
    artist: 'Indie Acoustic Project',
    album: 'Sunset Sessions',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover: 'assets/images/cover4.png',
    duration: '3:55',
  },
  {
    id: 5,
    title: 'Cosmic Voyage',
    artist: 'AstroSound',
    album: 'Beyond the Stars',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover: 'assets/images/cover5.png',
    duration: '5:07',
  },
  {
    id: 6,
    title: 'Urban Beats',
    artist: 'Metro Rhymes',
    album: 'Street Level',
    src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    cover: 'assets/images/cover1.png',
    duration: '3:33',
  },
];

/* ================================================================
   2. STATE
================================================================ */
const state = {
  currentIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 'none',   // 'none' | 'all' | 'one'
  isMuted: false,
  volume: 0.8,
  isMiniPlayer: false,
  currentSection: 'home',
  favorites: [],
  recentlyPlayed: [],
  filteredPlaylist: [...songs],
};

/* ================================================================
   3. DOM REFERENCES
================================================================ */
const dom = {
  loadingScreen: document.getElementById('loading-screen'),
  body: document.getElementById('app-body'),
  sidebar: document.getElementById('sidebar'),
  hamburgerBtn: document.getElementById('hamburger-btn'),
  navBtns: document.querySelectorAll('.nav-btn'),
  themeToggleBtn: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  themeLabel: document.getElementById('theme-label'),
  searchInput: document.getElementById('search-input'),
  searchResults: document.getElementById('search-results'),
  audio: document.getElementById('audio-player'),
  albumCover: document.getElementById('album-cover'),
  albumWrapper: document.getElementById('album-art-wrapper'),
  albumGlow: document.getElementById('album-glow'),
  playerBgBlur: document.getElementById('player-bg-blur'),
  songTitle: document.getElementById('song-title'),
  artistName: document.getElementById('artist-name'),
  albumName: document.getElementById('album-name'),
  currentTime: document.getElementById('current-time'),
  totalDuration: document.getElementById('total-duration'),
  progressContainer: document.getElementById('progress-container'),
  progressFill: document.getElementById('progress-fill'),
  progressThumb: document.getElementById('progress-thumb'),
  waveform: document.getElementById('waveform'),
  playBtn: document.getElementById('play-btn'),
  playIcon: document.getElementById('play-icon'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  shuffleBtn: document.getElementById('shuffle-btn'),
  repeatBtn: document.getElementById('repeat-btn'),
  repeatBadge: document.getElementById('repeat-badge'),
  favoriteBtn: document.getElementById('favorite-btn'),
  volumeToggleBtn: document.getElementById('volume-toggle-btn'),
  volumeIcon: document.getElementById('volume-icon'),
  playlistToggleBtn: document.getElementById('playlist-toggle-btn'),
  volumePanel: document.getElementById('volume-panel'),
  muteBtn: document.getElementById('mute-btn'),
  muteIcon: document.getElementById('mute-icon'),
  volumeTrack: document.getElementById('volume-track'),
  volumeFill: document.getElementById('volume-fill'),
  volumeThumb: document.getElementById('volume-thumb'),
  volumeSliderContainer: document.getElementById('volume-slider-container'),
  volumeValue: document.getElementById('volume-value'),
  playlistList: document.getElementById('playlist-list'),
  playlistCount: document.getElementById('playlist-count'),
  playlistSearch: document.getElementById('playlist-search'),
  playlistPanel: document.getElementById('playlist-panel'),
  sections: {
    home: document.getElementById('section-home'),
    search: document.getElementById('section-search'),
    playlist: document.getElementById('section-playlist'),
    favorites: document.getElementById('section-favorites'),
    recent: document.getElementById('section-recent'),
  },
  fullPlaylistGrid: document.getElementById('full-playlist-grid'),
  favoritesGrid: document.getElementById('favorites-grid'),
  recentGrid: document.getElementById('recent-grid'),
  bigSearchInput: document.getElementById('big-search-input'),
  bigSearchResults: document.getElementById('big-search-results'),
  miniPlayer: document.getElementById('mini-player'),
  miniCover: document.getElementById('mini-cover'),
  miniTitle: document.getElementById('mini-title'),
  miniArtist: document.getElementById('mini-artist'),
  miniPlayBtn: document.getElementById('mini-play'),
  miniPlayIcon: document.getElementById('mini-play-icon'),
  miniPrevBtn: document.getElementById('mini-prev'),
  miniNextBtn: document.getElementById('mini-next'),
  miniCloseBtn: document.getElementById('mini-close'),
  miniProgressFill: document.getElementById('mini-progress-fill'),
  miniPlayerToggle: document.getElementById('mini-player-toggle'),
  shortcutsModal: document.getElementById('shortcuts-modal'),
  keyboardShortcutsBtn: document.getElementById('keyboard-shortcuts-btn'),
  shortcutsModalClose: document.getElementById('shortcuts-modal-close'),
  toastContainer: null,
};

/* ================================================================
   4. UTILITY FUNCTIONS
================================================================ */

/** Format seconds into mm:ss */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Clamp a value between min and max */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/** Get a random index excluding current */
function randomIndexExcept(max, current) {
  if (max <= 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * max); } while (idx === current);
  return idx;
}

/** Show a toast notification */
function showToast(message, icon = 'fa-check-circle') {
  if (!dom.toastContainer) {
    dom.toastContainer = document.createElement('div');
    dom.toastContainer.className = 'toast-container';
    document.body.appendChild(dom.toastContainer);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i> ${message}`;
  dom.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

/** Save to localStorage safely */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage unavailable:', e);
  }
}

/** Load from localStorage safely */
function loadFromStorage(key, defaultValue = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/* ================================================================
   5. RESTORE STATE FROM LOCAL STORAGE
================================================================ */
function restoreState() {
  state.favorites = loadFromStorage('sw_favorites', []);
  state.recentlyPlayed = loadFromStorage('sw_recentlyPlayed', []);

  const lastIndex = loadFromStorage('sw_lastIndex', 0);
  if (lastIndex >= 0 && lastIndex < songs.length) {
    state.currentIndex = lastIndex;
  }

  const savedVolume = loadFromStorage('sw_volume', 0.8);
  state.volume = clamp(savedVolume, 0, 1);

  state.isShuffle = loadFromStorage('sw_shuffle', false);
  state.repeatMode = loadFromStorage('sw_repeat', 'none');

  const savedTheme = loadFromStorage('sw_theme', 'dark');
  applyTheme(savedTheme, true);
}

/* ================================================================
   6. THEME
================================================================ */
function applyTheme(theme, instant = false) {
  if (instant) dom.body.classList.add('no-transition');

  if (theme === 'light') {
    dom.body.classList.remove('dark-theme');
    dom.body.classList.add('light-theme');
    dom.themeIcon.className = 'fas fa-sun';
    dom.themeLabel.textContent = 'Light Mode';
  } else {
    dom.body.classList.remove('light-theme');
    dom.body.classList.add('dark-theme');
    dom.themeIcon.className = 'fas fa-moon';
    dom.themeLabel.textContent = 'Dark Mode';
  }

  if (instant) setTimeout(() => dom.body.classList.remove('no-transition'), 50);
  saveToStorage('sw_theme', theme);
}

function toggleTheme() {
  const isLight = dom.body.classList.contains('light-theme');
  applyTheme(isLight ? 'dark' : 'light');
  showToast(isLight ? 'Dark Mode' : 'Light Mode', 'fa-adjust');
}

/* ================================================================
   7. LOAD SONG
================================================================ */
function loadSong(index, autoplay = false) {
  if (index < 0 || index >= songs.length) return;

  const song = songs[index];
  state.currentIndex = index;

  // Fade out cover
  dom.albumCover.classList.add('fade-out');

  setTimeout(() => {
    // Update audio source
    dom.audio.src = song.src;
    dom.audio.load();

    // Update album art
    dom.albumCover.src = song.cover;
    dom.albumCover.alt = `Album cover for ${song.title} by ${song.artist}`;
    dom.albumCover.classList.remove('fade-out');
    dom.albumCover.classList.add('fade-in');
    setTimeout(() => dom.albumCover.classList.remove('fade-in'), 500);

    // Update mini player cover
    dom.miniCover.src = song.cover;
    dom.miniCover.alt = dom.albumCover.alt;

    // Update background blur
    dom.playerBgBlur.style.backgroundImage = `url('${song.cover}')`;
    dom.albumGlow.style.backgroundImage = `url('${song.cover}')`;
    dom.albumGlow.style.filter = 'blur(40px) saturate(2)';

    // Update song info
    dom.songTitle.textContent = song.title;
    dom.artistName.textContent = song.artist;
    dom.albumName.textContent = song.album;
    dom.miniTitle.textContent = song.title;
    dom.miniArtist.textContent = song.artist;

    // Update document title
    document.title = `${song.title} — ${song.artist} | SoundWave`;

    // Reset progress
    dom.progressFill.style.width = '0%';
    dom.miniProgressFill.style.width = '0%';
    dom.currentTime.textContent = '0:00';
    dom.totalDuration.textContent = song.duration;
    dom.progressContainer.setAttribute('aria-valuenow', '0');

    // Update UI states
    updateFavoriteBtn();
    updatePlaylistHighlight();
    updateGridHighlights();

    // Persist last index
    saveToStorage('sw_lastIndex', index);

    // Add to recently played
    addToRecentlyPlayed(song.id);

    if (autoplay) playSong();
  }, 250);
}

/* ================================================================
   8. PLAY / PAUSE
================================================================ */
function playSong() {
  if (!dom.audio.src || dom.audio.src === window.location.href) {
    dom.audio.src = songs[state.currentIndex].src;
    dom.audio.load();
  }

  const playPromise = dom.audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => setPlayState(true))
      .catch(err => {
        console.warn('Audio play blocked:', err.message);
        setPlayState(false);
      });
  }
}

function pauseSong() {
  dom.audio.pause();
  setPlayState(false);
}

function togglePlayPause() {
  state.isPlaying ? pauseSong() : playSong();
}

/** Update all UI to reflect playing/paused state */
function setPlayState(playing) {
  state.isPlaying = playing;

  dom.playIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
  dom.playBtn.setAttribute('aria-label', playing ? 'Pause (Space)' : 'Play (Space)');
  dom.playBtn.setAttribute('aria-pressed', String(playing));

  dom.miniPlayIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';

  if (playing) {
    dom.albumWrapper.classList.add('spinning');
    dom.albumWrapper.classList.remove('spinning-paused');
  } else {
    dom.albumWrapper.classList.add('spinning-paused');
  }

  dom.waveform.classList.toggle('active', playing);

  // Update active playlist item paused state
  const activeItem = dom.playlistList.querySelector('.playlist-item.active');
  if (activeItem) activeItem.classList.toggle('paused', !playing);
}

/* ================================================================
   9. NEXT / PREVIOUS
================================================================ */
function nextSong() {
  let nextIndex;
  if (state.isShuffle) {
    nextIndex = randomIndexExcept(songs.length, state.currentIndex);
  } else {
    nextIndex = (state.currentIndex + 1) % songs.length;
  }
  loadSong(nextIndex, state.isPlaying);
}

function prevSong() {
  // If more than 3s played, restart current
  if (dom.audio.currentTime > 3) {
    dom.audio.currentTime = 0;
    return;
  }
  let prevIndex;
  if (state.isShuffle) {
    prevIndex = randomIndexExcept(songs.length, state.currentIndex);
  } else {
    prevIndex = (state.currentIndex - 1 + songs.length) % songs.length;
  }
  loadSong(prevIndex, state.isPlaying);
}

/* ================================================================
   10. PROGRESS BAR
================================================================ */
function updateProgress() {
  const { currentTime, duration } = dom.audio;
  if (!isNaN(duration) && duration > 0) {
    const pct = (currentTime / duration) * 100;
    dom.progressFill.style.width = `${pct}%`;
    dom.miniProgressFill.style.width = `${pct}%`;
    dom.progressContainer.setAttribute('aria-valuenow', Math.round(pct));
  }
  dom.currentTime.textContent = formatTime(currentTime);
}

function onMetadataLoaded() {
  dom.totalDuration.textContent = formatTime(dom.audio.duration);
  songs[state.currentIndex].duration = formatTime(dom.audio.duration);
  const items = dom.playlistList.querySelectorAll('.playlist-item');
  items.forEach(item => {
    if (parseInt(item.dataset.index) === state.currentIndex) {
      const durEl = item.querySelector('.item-duration');
      if (durEl) durEl.textContent = formatTime(dom.audio.duration);
    }
  });
}

let isDraggingProgress = false;

function seekToPosition(event) {
  const rect = dom.progressContainer.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
  if (!isNaN(dom.audio.duration)) {
    dom.audio.currentTime = pct * dom.audio.duration;
    dom.progressFill.style.width = `${pct * 100}%`;
    dom.miniProgressFill.style.width = `${pct * 100}%`;
  }
}

dom.progressContainer.addEventListener('mousedown', (e) => {
  isDraggingProgress = true;
  seekToPosition(e);
});

dom.progressContainer.addEventListener('touchstart', (e) => {
  isDraggingProgress = true;
  seekToPosition(e);
}, { passive: true });

dom.progressContainer.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') dom.audio.currentTime = clamp(dom.audio.currentTime + 5, 0, dom.audio.duration || 0);
  if (e.key === 'ArrowLeft')  dom.audio.currentTime = clamp(dom.audio.currentTime - 5, 0, dom.audio.duration || 0);
});

document.addEventListener('mousemove', (e) => { if (isDraggingProgress) seekToPosition(e); });
document.addEventListener('mouseup', () => { isDraggingProgress = false; });
document.addEventListener('touchend', () => { isDraggingProgress = false; });

/* ================================================================
   11. VOLUME CONTROL
================================================================ */
function setVolume(level) {
  state.volume = clamp(level, 0, 1);
  dom.audio.volume = state.volume;

  const pct = state.volume * 100;
  dom.volumeFill.style.width = `${pct}%`;

  const trackWidth = dom.volumeTrack.offsetWidth;
  const thumbLeft = (state.volume * trackWidth) - 7;
  dom.volumeThumb.style.left = `${clamp(thumbLeft, 0, trackWidth - 7)}px`;
  dom.volumeThumb.style.right = 'auto';

  dom.volumeValue.textContent = `${Math.round(pct)}%`;
  dom.volumeSliderContainer.setAttribute('aria-valuenow', Math.round(pct));

  updateVolumeIcon();

  if (state.volume > 0 && state.isMuted) {
    state.isMuted = false;
    dom.audio.muted = false;
    dom.muteBtn.setAttribute('aria-pressed', 'false');
  }

  saveToStorage('sw_volume', state.volume);
}

function updateVolumeIcon() {
  let cls;
  if (state.isMuted || state.volume === 0) cls = 'fas fa-volume-mute';
  else if (state.volume < 0.4) cls = 'fas fa-volume-down';
  else cls = 'fas fa-volume-up';
  dom.volumeIcon.className = cls;
  dom.muteIcon.className = cls;
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  dom.audio.muted = state.isMuted;
  dom.muteBtn.setAttribute('aria-pressed', String(state.isMuted));
  updateVolumeIcon();
  showToast(state.isMuted ? 'Muted' : 'Unmuted', state.isMuted ? 'fa-volume-mute' : 'fa-volume-up');
}

let isDraggingVolume = false;

function seekVolume(event) {
  const rect = dom.volumeTrack.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
  setVolume(pct);
}

dom.volumeSliderContainer.addEventListener('mousedown', (e) => { isDraggingVolume = true; seekVolume(e); });
dom.volumeSliderContainer.addEventListener('touchstart', (e) => { isDraggingVolume = true; seekVolume(e); }, { passive: true });
dom.volumeSliderContainer.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   setVolume(state.volume + 0.05);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') setVolume(state.volume - 0.05);
});

document.addEventListener('mousemove', (e) => { if (isDraggingVolume) seekVolume(e); });
document.addEventListener('mouseup', () => { isDraggingVolume = false; });
document.addEventListener('touchend', () => { isDraggingVolume = false; });

/* ================================================================
   12. SHUFFLE
================================================================ */
function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  dom.shuffleBtn.classList.toggle('active', state.isShuffle);
  dom.shuffleBtn.setAttribute('aria-pressed', String(state.isShuffle));
  showToast(state.isShuffle ? 'Shuffle On' : 'Shuffle Off', 'fa-random');
  saveToStorage('sw_shuffle', state.isShuffle);
}

/* ================================================================
   13. REPEAT
================================================================ */
function toggleRepeat() {
  const modes = ['none', 'all', 'one'];
  const next = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length];
  state.repeatMode = next;
  updateRepeatUI();
  const msgs = { none: 'Repeat Off', all: 'Repeat All', one: 'Repeat One' };
  showToast(msgs[next], 'fa-redo');
  saveToStorage('sw_repeat', next);
}

function updateRepeatUI() {
  const isActive = state.repeatMode !== 'none';
  dom.repeatBtn.classList.toggle('active', isActive);
  dom.repeatBtn.setAttribute('aria-pressed', String(isActive));
  dom.repeatBtn.setAttribute('data-repeat', state.repeatMode);
  dom.repeatBadge.textContent = state.repeatMode === 'one' ? '1' : '';
}

/* ================================================================
   14. SONG END
================================================================ */
dom.audio.addEventListener('ended', () => {
  if (state.repeatMode === 'one') {
    dom.audio.currentTime = 0;
    playSong();
  } else if (state.repeatMode === 'all' || state.currentIndex < songs.length - 1) {
    nextSong();
  } else {
    setPlayState(false);
    dom.audio.currentTime = 0;
    dom.progressFill.style.width = '0%';
    dom.miniProgressFill.style.width = '0%';
  }
});

/* ================================================================
   15. FAVORITES
================================================================ */
function toggleFavorite(songId = songs[state.currentIndex].id) {
  const idx = state.favorites.indexOf(songId);
  if (idx === -1) {
    state.favorites.push(songId);
    showToast('Added to Favorites', 'fa-heart');
  } else {
    state.favorites.splice(idx, 1);
    showToast('Removed from Favorites', 'fa-heart-broken');
  }
  saveToStorage('sw_favorites', state.favorites);
  updateFavoriteBtn();
  updatePlaylistItemFavBtns();
  if (state.currentSection === 'favorites') renderFavoritesSection();
}

function updateFavoriteBtn() {
  const isFav = state.favorites.includes(songs[state.currentIndex].id);
  dom.favoriteBtn.classList.toggle('active', isFav);
  dom.favoriteBtn.setAttribute('aria-pressed', String(isFav));
  dom.favoriteBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
}

function updatePlaylistItemFavBtns() {
  dom.playlistList.querySelectorAll('.item-fav-btn').forEach(btn => {
    const id = parseInt(btn.dataset.songId);
    const isFav = state.favorites.includes(id);
    btn.classList.toggle('active', isFav);
    btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
  });
}

/* ================================================================
   16. RECENTLY PLAYED
================================================================ */
function addToRecentlyPlayed(songId) {
  state.recentlyPlayed = state.recentlyPlayed.filter(id => id !== songId);
  state.recentlyPlayed.unshift(songId);
  state.recentlyPlayed = state.recentlyPlayed.slice(0, 20);
  saveToStorage('sw_recentlyPlayed', state.recentlyPlayed);
  if (state.currentSection === 'recent') renderRecentSection();
}

/* ================================================================
   17. PLAYLIST RENDERING
================================================================ */
function createPlaylistItem(song, originalIndex) {
  const li = document.createElement('li');
  li.className = 'playlist-item';
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', 'false');
  li.dataset.index = originalIndex;
  li.dataset.id = song.id;

  const isFav = state.favorites.includes(song.id);

  li.innerHTML = `
    <span class="item-num" aria-hidden="true">${originalIndex + 1}</span>
    <span class="item-bars" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
    <img class="item-cover" src="${song.cover}" alt="Cover for ${song.title}" loading="lazy" />
    <div class="item-info">
      <p class="item-title">${song.title}</p>
      <p class="item-artist">${song.artist}</p>
    </div>
    <span class="item-duration">${song.duration}</span>
    <button
      class="item-fav-btn ${isFav ? 'active' : ''}"
      data-song-id="${song.id}"
      aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
      title="Favorite"
    ><i class="fas fa-heart" aria-hidden="true"></i></button>
  `;

  li.addEventListener('click', (e) => {
    if (e.target.closest('.item-fav-btn')) return;
    if (state.currentIndex === originalIndex) {
      togglePlayPause();
    } else {
      loadSong(originalIndex, true);
    }
  });

  li.querySelector('.item-fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(song.id);
  });

  return li;
}

function renderPlaylist(songList = songs) {
  dom.playlistList.innerHTML = '';
  state.filteredPlaylist = songList;
  dom.playlistCount.textContent = `${songList.length} Song${songList.length !== 1 ? 's' : ''}`;

  if (songList.length === 0) {
    dom.playlistList.innerHTML = `
      <li class="empty-state">
        <i class="fas fa-search" aria-hidden="true"></i>
        <p>No songs found</p>
      </li>`;
    return;
  }

  songList.forEach(song => {
    const originalIndex = songs.findIndex(s => s.id === song.id);
    dom.playlistList.appendChild(createPlaylistItem(song, originalIndex));
  });

  updatePlaylistHighlight();
}

function updatePlaylistHighlight() {
  dom.playlistList.querySelectorAll('.playlist-item').forEach(item => {
    const isActive = parseInt(item.dataset.index) === state.currentIndex;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.classList.toggle('paused', isActive && !state.isPlaying);
  });

  const activeItem = dom.playlistList.querySelector('.playlist-item.active');
  if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ================================================================
   18. SONG CARDS (grid views)
================================================================ */
function createSongCard(song, originalIndex) {
  const div = document.createElement('div');
  div.className = `song-card ${originalIndex === state.currentIndex ? 'active' : ''}`;
  div.setAttribute('role', 'listitem');
  div.setAttribute('aria-label', `${song.title} by ${song.artist}`);
  div.dataset.index = originalIndex;

  div.innerHTML = `
    <div style="position:relative;overflow:hidden;">
      <img class="song-card-cover" src="${song.cover}" alt="Album art for ${song.title}" loading="lazy" />
      <div class="song-card-overlay">
        <button class="song-card-play-btn" aria-label="Play ${song.title}">
          <i class="fas fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="song-card-info">
      <p class="song-card-title">${song.title}</p>
      <p class="song-card-artist">${song.artist}</p>
    </div>
  `;

  div.addEventListener('click', () => {
    loadSong(originalIndex, true);
    navigateToSection('home');
  });

  return div;
}

function updateGridHighlights() {
  document.querySelectorAll('.song-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.index) === state.currentIndex);
  });
}

/* ================================================================
   19. SECTION NAVIGATION
================================================================ */
function navigateToSection(sectionId) {
  state.currentSection = sectionId;

  Object.entries(dom.sections).forEach(([key, el]) => {
    if (key === sectionId) {
      el.removeAttribute('hidden');
      el.classList.add('active');
    } else {
      el.setAttribute('hidden', '');
      el.classList.remove('active');
    }
  });

  dom.navBtns.forEach(btn => {
    const isActive = btn.dataset.section === sectionId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  if (sectionId === 'playlist')  renderFullPlaylistSection();
  if (sectionId === 'favorites') renderFavoritesSection();
  if (sectionId === 'recent')    renderRecentSection();

  if (window.innerWidth <= 768) closeSidebar();
}

function renderFullPlaylistSection() {
  dom.fullPlaylistGrid.innerHTML = '';
  songs.forEach((song, idx) => {
    dom.fullPlaylistGrid.appendChild(createSongCard(song, idx));
  });
}

function renderFavoritesSection() {
  dom.favoritesGrid.innerHTML = '';
  const favSongs = songs.filter(s => state.favorites.includes(s.id));
  if (favSongs.length === 0) {
    dom.favoritesGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-heart-broken" aria-hidden="true"></i>
        <p>No favorites yet. Click ♥ to add songs.</p>
      </div>`;
    return;
  }
  favSongs.forEach(song => {
    const idx = songs.findIndex(s => s.id === song.id);
    dom.favoritesGrid.appendChild(createSongCard(song, idx));
  });
}

function renderRecentSection() {
  dom.recentGrid.innerHTML = '';
  const recentSongs = state.recentlyPlayed.map(id => songs.find(s => s.id === id)).filter(Boolean);
  if (recentSongs.length === 0) {
    dom.recentGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-history" aria-hidden="true"></i>
        <p>No recently played songs yet.</p>
      </div>`;
    return;
  }
  recentSongs.forEach(song => {
    const idx = songs.findIndex(s => s.id === song.id);
    dom.recentGrid.appendChild(createSongCard(song, idx));
  });
}

/* ================================================================
   20. SEARCH
================================================================ */
function filterSongs(query) {
  const q = query.trim().toLowerCase();
  if (!q) return songs;
  return songs.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q)
  );
}

// Header search
dom.searchInput.addEventListener('input', () => {
  const query = dom.searchInput.value;
  const results = filterSongs(query);

  if (!query.trim()) {
    dom.searchResults.setAttribute('hidden', '');
    dom.searchResults.innerHTML = '';
    return;
  }

  dom.searchResults.removeAttribute('hidden');
  dom.searchResults.innerHTML = '';

  if (results.length === 0) {
    dom.searchResults.innerHTML = `<div class="search-result-item"><span>No results found</span></div>`;
    return;
  }

  results.slice(0, 6).forEach(song => {
    const idx = songs.findIndex(s => s.id === song.id);
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.setAttribute('role', 'option');
    div.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <div class="search-result-info">
        <p class="result-title">${song.title}</p>
        <p class="result-artist">${song.artist}</p>
      </div>
    `;
    div.addEventListener('click', () => {
      loadSong(idx, true);
      navigateToSection('home');
      dom.searchInput.value = '';
      dom.searchResults.setAttribute('hidden', '');
    });
    dom.searchResults.appendChild(div);
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    dom.searchResults.setAttribute('hidden', '');
  }
});

// Full-page search
dom.bigSearchInput.addEventListener('input', () => {
  const results = filterSongs(dom.bigSearchInput.value);
  dom.bigSearchResults.innerHTML = '';
  if (results.length === 0) {
    dom.bigSearchResults.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-search" aria-hidden="true"></i>
        <p>No songs found for "${dom.bigSearchInput.value}"</p>
      </div>`;
    return;
  }
  results.forEach(song => {
    const idx = songs.findIndex(s => s.id === song.id);
    dom.bigSearchResults.appendChild(createSongCard(song, idx));
  });
});

function initBigSearch() {
  dom.bigSearchResults.innerHTML = '';
  songs.forEach((song, idx) => dom.bigSearchResults.appendChild(createSongCard(song, idx)));
}

// Playlist sidebar filter
dom.playlistSearch.addEventListener('input', () => {
  renderPlaylist(filterSongs(dom.playlistSearch.value));
});

/* ================================================================
   21. VOLUME PANEL TOGGLE
================================================================ */
dom.volumeToggleBtn.addEventListener('click', () => {
  if (dom.volumePanel.hasAttribute('hidden')) {
    dom.volumePanel.removeAttribute('hidden');
  } else {
    dom.volumePanel.setAttribute('hidden', '');
  }
});

/* ================================================================
   22. PLAYLIST TOGGLE BUTTON
================================================================ */
dom.playlistToggleBtn.addEventListener('click', () => {
  dom.playlistToggleBtn.classList.toggle('active');
  if (window.innerWidth <= 768) {
    dom.playlistPanel.scrollIntoView({ behavior: 'smooth' });
  }
});

/* ================================================================
   23. MINI PLAYER
================================================================ */
function showMiniPlayer() {
  state.isMiniPlayer = true;
  dom.miniPlayer.removeAttribute('hidden');
  dom.miniPlayerToggle.classList.add('active');
}

function hideMiniPlayer() {
  state.isMiniPlayer = false;
  dom.miniPlayer.setAttribute('hidden', '');
  dom.miniPlayerToggle.classList.remove('active');
}

dom.miniPlayerToggle.addEventListener('click', () => {
  state.isMiniPlayer ? hideMiniPlayer() : showMiniPlayer();
});

dom.miniCloseBtn.addEventListener('click', hideMiniPlayer);
dom.miniPlayBtn.addEventListener('click', togglePlayPause);
dom.miniPrevBtn.addEventListener('click', prevSong);
dom.miniNextBtn.addEventListener('click', nextSong);

/* ================================================================
   24. MOBILE SIDEBAR
================================================================ */
let sidebarOverlay;

function openSidebar() {
  dom.sidebar.classList.add('open');
  dom.hamburgerBtn.setAttribute('aria-expanded', 'true');
  if (!sidebarOverlay) {
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  sidebarOverlay.classList.add('visible');
}

function closeSidebar() {
  dom.sidebar.classList.remove('open');
  dom.hamburgerBtn.setAttribute('aria-expanded', 'false');
  if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
}

dom.hamburgerBtn.addEventListener('click', () => {
  dom.sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

/* ================================================================
   25. KEYBOARD SHORTCUTS MODAL
================================================================ */
dom.keyboardShortcutsBtn.addEventListener('click', () => {
  dom.shortcutsModal.removeAttribute('hidden');
  dom.shortcutsModalClose.focus();
});

dom.shortcutsModalClose.addEventListener('click', () => {
  dom.shortcutsModal.setAttribute('hidden', '');
});

dom.shortcutsModal.addEventListener('click', (e) => {
  if (e.target === dom.shortcutsModal) dom.shortcutsModal.setAttribute('hidden', '');
});

/* ================================================================
   26. KEYBOARD SHORTCUTS
================================================================ */
document.addEventListener('keydown', (e) => {
  // Don't fire when typing in inputs
  if (e.target.matches('input, textarea, [contenteditable]')) return;

  switch (e.key) {
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextSong();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevSong();
      break;
    case 'ArrowUp':
      e.preventDefault();
      setVolume(state.volume + 0.05);
      showToast(`Volume: ${Math.round(state.volume * 100)}%`, 'fa-volume-up');
      break;
    case 'ArrowDown':
      e.preventDefault();
      setVolume(state.volume - 0.05);
      showToast(`Volume: ${Math.round(state.volume * 100)}%`, 'fa-volume-down');
      break;
    case 'm': case 'M':
      toggleMute();
      break;
    case 'r': case 'R':
      toggleRepeat();
      break;
    case 's': case 'S':
      toggleShuffle();
      break;
    case 'f': case 'F':
      toggleFavorite();
      break;
    case 'Escape':
      dom.shortcutsModal.setAttribute('hidden', '');
      dom.searchResults.setAttribute('hidden', '');
      closeSidebar();
      break;
  }
});

/* ================================================================
   27. AUDIO EVENT LISTENERS
================================================================ */
dom.audio.addEventListener('timeupdate', updateProgress);
dom.audio.addEventListener('loadedmetadata', onMetadataLoaded);
dom.audio.addEventListener('error', () => {
  // Graceful handling when no audio file exists
  console.warn('Audio source not found — add MP3 files to assets/audio/ directory.');
  setPlayState(false);
});

/* ================================================================
   28. CONTROL BUTTON EVENTS
================================================================ */
dom.playBtn.addEventListener('click', togglePlayPause);
dom.prevBtn.addEventListener('click', prevSong);
dom.nextBtn.addEventListener('click', nextSong);
dom.shuffleBtn.addEventListener('click', toggleShuffle);
dom.repeatBtn.addEventListener('click', toggleRepeat);
dom.favoriteBtn.addEventListener('click', () => toggleFavorite());
dom.muteBtn.addEventListener('click', toggleMute);
dom.themeToggleBtn.addEventListener('click', toggleTheme);

/* ================================================================
   29. NAV BUTTONS
================================================================ */
dom.navBtns.forEach(btn => {
  btn.addEventListener('click', () => navigateToSection(btn.dataset.section));
});

/* ================================================================
   30. HOVER SPOTLIGHT EFFECT ON NAV BUTTONS
================================================================ */
dom.navBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    btn.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });
});

/* ================================================================
   31. INITIALIZATION
================================================================ */
function init() {
  restoreState();
  loadSong(state.currentIndex, false);

  dom.audio.volume = state.volume;
  setVolume(state.volume);

  dom.shuffleBtn.classList.toggle('active', state.isShuffle);
  dom.shuffleBtn.setAttribute('aria-pressed', String(state.isShuffle));
  updateRepeatUI();

  renderPlaylist(songs);
  initBigSearch();
  navigateToSection('home');

  // Hide loading screen
  setTimeout(() => dom.loadingScreen.classList.add('hidden'), 1800);
}

/* ================================================================
   32. KICK OFF
================================================================ */
init();
