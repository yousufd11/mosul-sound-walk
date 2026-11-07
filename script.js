const audio = document.querySelector('#walk');
const photo = document.querySelector('#scene');
const stops = document.querySelectorAll('[data-stop]');
const pictures = ['tea.svg', 'lane.svg', 'river.svg'];
const labels = ['01 / Tea stall', '02 / Side street', '03 / Tigris bank'];
const descriptions = [
  'A small glass of amber tea on the counter of a street stall.',
  'Sunlight falls between two rows of doorways along a narrow lane.',
  'Birds cross the sky above the Tigris and a low skyline.'
];
let current = 0;

function showStop() {
  let next = 0;
  if (audio.currentTime >= 50) next = 2;
  else if (audio.currentTime >= 25) next = 1;
  if (next === current) return;
  current = next;
  photo.src = pictures[current];
  photo.alt = descriptions[current];
  document.querySelector('#label').textContent = labels[current];
  stops.forEach((button, i) => button.setAttribute('aria-pressed', i === current));
}

stops.forEach(button => {
  button.addEventListener('click', () => {
    audio.currentTime = Number(button.dataset.stop);
    showStop();
    audio.play().catch(() => { document.querySelector('.hint').textContent = 'Use the audio player to start playback.'; });
  });
});
audio.addEventListener('timeupdate', showStop);
audio.addEventListener('seeked', showStop);
audio.addEventListener('play', () => document.body.classList.add('playing'));
audio.addEventListener('pause', () => document.body.classList.remove('playing'));
audio.addEventListener('ended', () => document.body.classList.remove('playing'));
