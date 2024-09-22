// TOGGLE THEME

let toggleContainer = document.querySelector("#toggle-container");
toggleContainer.addEventListener("click", toggleTheme);

function toggleTheme() {
  let toggleButton = document.querySelector("#toggle-button");
  let theme = document.querySelector("#theme");
  let rootBg = document.querySelector(":root");
  let body = document.querySelector("body");
  if (toggleButton.classList.contains("light")) {
    toggleButton.classList.remove("light");
    toggleButton.classList.add("dark");
    toggleButton.style.left = "40px";
    theme.textContent = "light";
    rootBg.style.setProperty("--common-bg", "#253238");
    rootBg.style.setProperty("--common-button-bg", "#64696c");
    rootBg.style.setProperty("--toggle-bg", "#2196f2");
    rootBg.style.setProperty("--shadow-color", "#6b6b6b");
    rootBg.style.setProperty("--input-bg", "#565657");
    rootBg.style.setProperty("--text-color", "white");
    body.style.backgroundColor = "#565657";
  } else {
    toggleButton.classList.remove("dark");
    toggleButton.classList.add("light");
    toggleButton.style.left = "5px";
    theme.textContent = "dark";
    rootBg.style.setProperty("--common-bg", "#6bb8de");
    rootBg.style.setProperty("--common-button-bg", "#0d81bc");
    rootBg.style.setProperty("--toggle-bg", "#cbcccc");
    rootBg.style.setProperty("--shadow-color", "#725d9b");
    rootBg.style.setProperty("--input-bg", "white");
    rootBg.style.setProperty("--text-color", "black");
    body.style.backgroundColor = "";
  }
}

let songJSON = [
  {
    id: "1",
    title: "Chaotic",
    artist: "Memphis May Fire",
    genre: "rock",
    audioSrc: "audio/chaotic.mp3",
    imgSrc: "image/chaotic.png",
  },
  {
    id: "2",
    title: "Midnight",
    artist: "Coldplay",
    genre: "pop",
    audioSrc: "audio/midnight.mp3",
    imgSrc: "image/midnight.png",
  },
  {
    id: "3",
    title: "Paradise",
    artist: "Coldplay",
    genre: "pop",
    audioSrc: "audio/paradise.mp3",
    imgSrc: "image/paradise.png",
  },
  {
    id: "4",
    title: "Yellow",
    artist: "Coldplay",
    genre: "pop",
    audioSrc: "audio/yellow.mp3",
    imgSrc: "image/yellow.png",
  },
  {
    id: "5",
    title: "Payphone",
    artist: "Maroon 5",
    genre: "hiphop",
    audioSrc: "audio/payphone.mp3",
    imgSrc: "image/payphone.png",
  },
  {
    id: "6",
    title: "Sugar",
    artist: "Maroon 5",
    genre: "hiphop",
    audioSrc: "audio/sugar.mp3",
    imgSrc: "image/sugar.png",
  },
];

let currentSongs = [];
showSongs(songJSON);
function showSongs(songArr) {
  currentSongs = [];
  let allSongs = document.querySelector("#all-songs");
  allSongs.innerHTML = "";
  songArr.forEach((song) => {
    let songDiv = document.createElement("div");
    songDiv.textContent = song.title + " - " + song.artist;
    songDiv.classList.add(song.id);
    allSongs.appendChild(songDiv);
    currentSongs.push(song);
  });
  let allSongChildren = allSongs.children;
  for (let i = 0; i < allSongChildren.length; i++) {
    allSongChildren[i].addEventListener("click", (event) => {
      // let id = allSongChildren[i].className;
      renderCurrentSong(currentSongs, i);
    });
  }
}
// Filter by Genre
let genreFilter = document.querySelector("#genre-dropdown");
genreFilter.addEventListener("change", (event) => {
  let genre = event.target.value;
  let filteredSongs;
  if (genre === "all") {
    filteredSongs = songJSON;
  } else {
    filteredSongs = songJSON.filter((song) => song.genre === genre);
  }
  showSongs(filteredSongs);
});

//Song Card and audio player

function renderCurrentSong(currSongArr, index) {
  let songImg = document.querySelector("#song-img");
  let songTitle = document.querySelector("#song-card-title");
  let songArtist = document.querySelector("#song-card-artist");
  let audioPlayer = document.querySelector("#audio");

  let currentSong = currSongArr[index];
  songImg.src = currentSong.imgSrc;
  songTitle.textContent = currentSong.title;
  songArtist.textContent = currentSong.artist;
  audioPlayer.src = currentSong.audioSrc;
  audioPlayer.play();

  let nextButton = document.querySelector("#next");
  let prevButton = document.querySelector("#previous");

  nextButton.addEventListener("click", () => {
    index++;
    audioPlayer.pause();
    if (index >= currSongArr.length) {
      index = 0;
    }
    renderCurrentSong(currSongArr, index);
  });

  prevButton.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = currSongArr.length - 1;
    }
    renderCurrentSong(currSongArr, index);
  });
}

//Add to playlist button
let addPlaylistButton = document.querySelector("#add-to-playlist");
addPlaylistButton.addEventListener("click", () => {
  let songCardTitle = document.querySelector("#song-card-title").textContent;
  let currentSong = currentSongs.find((song) => song.title === songCardTitle);
  addPlaylist(currentSong);
});

//currentPlaylist and all Playlists
let allPlaylists = [];
let createPlaylistButton = document.querySelector("#playlist-form");
createPlaylistButton.addEventListener("submit", createPlaylist);

function createPlaylist(event) {
  event.preventDefault();
  let playlistNameInput = document.querySelector("#playlist-name");
  let playlistName = playlistNameInput.value;
  playlistNameInput.value = "";
  if (playlistName === "") {
    return;
  }
  for (let i = 0; i < allPlaylists.length; i++) {
    if (allPlaylists[i].name === playlistName) {
      return;
    }
  }

  let playlist = {
    name: playlistName,
    songs: [],
  };
  allPlaylists.push(playlist);
  let playlists = document.querySelector("#allPlaylist");
  let playlistDiv = document.createElement("div");
  playlistDiv.textContent = playlist.name;
  playlists.appendChild(playlistDiv);

  currentPlaylist(allPlaylists);
}

function currentPlaylist(currentPlaylistSongs) {
  let allPlaylistDiv = document.querySelector("#allPlaylist").children;
  for (let i = 0; i < allPlaylistDiv.length; i++) {
    allPlaylistDiv[i].addEventListener("click", () => {
      for (let j = 0; j < allPlaylistDiv.length; j++) {
        allPlaylistDiv[j].classList.remove("selected");
      }
      allPlaylistDiv[i].classList.add("selected");
      currentPlaylist(allPlaylists);
    });
  }

  let selectedPlaylistName = "";
  for (let i = 0; i < allPlaylistDiv.length; i++) {
    if (allPlaylistDiv[i].classList.contains("selected")) {
      selectedPlaylistName = allPlaylistDiv[i].textContent;
      break;
    }
  }

  if (selectedPlaylistName === "") {
    return;
  }
  let selectedPlaylist = currentPlaylistSongs.find(
    (playlist) => playlist.name === selectedPlaylistName
  );
  let currentPlaylistContainer = document.querySelector("#currentPlaylist");
  currentPlaylistContainer.innerHTML = "";
  selectedPlaylist.songs.forEach((song, index) => {
    let songDiv = document.createElement("div");
    songDiv.textContent = song.title + " - " + song.artist;
    currentPlaylistContainer.appendChild(songDiv);
    addListener(songDiv, selectedPlaylist, index);
  });
}

function addListener(songDiv, selectedPlaylist, index) {
  songDiv.addEventListener("click", () => {
    renderCurrentSong(selectedPlaylist.songs, index);
  });
}

// Add to Playlist
function addPlaylist(song) {
  // console.log(song);
  let selectedPlaylistName = "";
  let allPlaylistDiv = document.querySelector("#allPlaylist").children;
  for (let i = 0; i < allPlaylistDiv.length; i++) {
    if (allPlaylistDiv[i].classList.contains("selected")) {
      selectedPlaylistName = allPlaylistDiv[i].textContent;
      break;
    }
  }

  if (selectedPlaylistName === "") {
    return;
  }

  let selectedPlaylist = allPlaylists.find(
    (playlist) => playlist.name === selectedPlaylistName
  );
  selectedPlaylist.songs.push(song);
  currentPlaylist(allPlaylists);
}
