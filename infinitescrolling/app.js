const profile = (
  url,
  name
) => `<div class="profile border overflow-hidden rounded-md border-white/10 shadow hover:bg-white/30 backdrop-blur-2xl grid place-items-center w-28 h-28 transition-all bg-blue-500/10"
    >
      <img src="${url}"  class="w-20 h-20 object-contain rounded-full"/>
      <p class="text-sm text-white">${name}</p>
    </div>`;
const body = document.querySelector('.container');
const loadingOverlay = document.createElement('div');
const loading = document.createElement('div');
const loadingText = document.createElement('p');
loadingText.className = 'ml-2 text-white';
loading.className =
  'border-top-color:transparent w-2 h-8 border-4 border-blue-200 rounded-full animate-spin';
loadingOverlay.className = 'w-24 h-24 grid place-items-center';
loadingOverlay.appendChild(loading);
loadingText.innerHTML = 'Loading...';
loadingOverlay.appendChild(loadingText);

async function getProfiles(limit = 10) {
  try {
    body.appendChild(loadingOverlay);
    const res = await fetch(
      `https://random-data-api.com/api/v2/users?size=${limit}`
    );
    loadingOverlay.remove();
    const data = await res.json();
    data.map(
      (item) =>
        (body.innerHTML += profile(
          item.avatar,
          item.first_name + ' ' + item.last_name
        ))
    );
  } catch (error) {
    console.log(error.message);
  }
}

let count = 10;
let isFirst = false;

body.addEventListener('scroll', () => {
  const scrollHeight = body.scrollHeight;
  const scrollRemain = body.scrollTop + body.offsetHeight;

  if (scrollHeight === scrollRemain) {
    getProfiles(count);
    count += 10;
  }
});
if (!isFirst) {
  getProfiles(10);
  isFirst = true;
}
