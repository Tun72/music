const music = document.querySelector(".audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

const musicImage = document.querySelector(".img-container img");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");

const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const timeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

const songs = [
  {
    name: "limbo",
    displayName: "Limbo",
    artist: "Keshi",
  },
  {
    name: "night",
    displayName: "Night Dancer",
    artist: "Imase",
  },
  {
    name: "double",
    displayName: "Double take",
    artist: "Dhruv",
  },
  {
    name: "die",
    displayName: "Die for you",
    artist: "The Weeknd",
  },
  {
    name: "under",
    displayName: "Under the influence",
    artist: "Chris Brown",
  },

  {
    name: "web",
    displayName: "Wet The Bed",
    artist: "Chris Brown",
  },

];

let isPlaying = false;
let defaultSong = 0;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  musicImage.src = `img/${song.name}.jpg`;
}

function nextSong() {
  defaultSong++;
  defaultSong = defaultSong % songs.length;
  loadSong(songs[defaultSong]);
  playSong();
}

function prevSong() {
  defaultSong--;
  defaultSong = defaultSong < 0 ? songs.length - 1 : defaultSong;

  loadSong(songs[defaultSong]);
  playSong();
}

// progress

function setTime(duration, element) {
  let minute = Math.floor(duration / 60);
  let second = Math.floor(duration % 60);

  second = second < 10 ? "0" + second : second;
  if (second) {
    element.textContent = `${minute}:${second}`;
  }
}

function updateProgressbar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const percent = Math.floor((currentTime / duration) * 100);
    progress.style.width = `${percent}%`;

    setTime(duration, durationEl);
    setTime(currentTime, timeEl);
  }
}

function setProgressbar(e) {
  const maxWidth = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / maxWidth) * duration;
  // console.log(maxWidth, clickX, duration, e);
  // progress.style.width = (clickX / maxWidth) * 100;
  // setTime(duration, durationEl)
}

// Event
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressbar);
progressContainer.addEventListener("click", setProgressbar);
