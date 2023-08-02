// js/02-video.js
import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new VimeoPlayer(iframe);

const saveCurrentTime = throttle(function (time) {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

// Добавим обработчик события beforeunload для сохранения времени перед закрытием страницы
window.addEventListener('beforeunload', function () {
  player.getCurrentTime().then(function (time) {
    localStorage.setItem('videoplayer-current-time', time);
  });
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime !== null) {
  player.setCurrentTime(parseFloat(savedTime));
}

