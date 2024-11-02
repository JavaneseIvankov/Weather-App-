
const API_KEY = 'Put your openweather API KEY here';

const mainContainer = document.querySelector('.main-container');
const mainWeather = document.querySelector('.main-weather');
const subWeather = document.querySelector('.sub-weather');
const info = document.querySelector('.info');
const weatherImg = document.querySelector('#weather-img');
const temp = document.querySelector('#temp');
const city = document.querySelector('#city');
const weatherDesc = document.querySelector('#weather-desc');
const windDesc = document.querySelector('#wind-desc');
const humidityDesc = document.querySelector('#humidity-desc');

const cityInput = document.querySelector('input');
const submit = document.querySelector('#submit');
let citySubmitted = null;

function validate(input) {
   if (input.length === 0) {
      return false;
   } else {
      regexp = /^[a-zA-Z']*$/;
      const res = regexp.test(input);
      res ? console.log('valid') : console.log('invalid');
      return res;
   }
}

cityInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') {
      let citySubmitted = cityInput.value;
      validate(citySubmitted)
         ? getWeather(citySubmitted).then(updateDisplay)
         : showError();
      cityInput.value = '';
   }
});

submit.addEventListener('click', () => {
   citySubmitted = cityInput.value;
   validate(citySubmitted)
      ? getWeather(citySubmitted).then(updateDisplay)
      : showError();
   cityInput.value = '';
});

async function getWeather(citySubmitted) {
   try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySubmitted}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
         console.log('response error');
         showError();
         return null;
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
   } catch (error) {
      return null;
   }
}

function showError() {
   const info = document.querySelector('.info');

   mainWeather.style.display = 'none';

   info.style.display = 'block';
   mainContainer.style.display = 'block';
   mainWeather.style.display = 'none';
   subWeather.style.display = 'none';
}

function updateDisplay(data) {
   if (data === null) {
      showError();
      return;
   }
   weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
   temp.textContent = `${data.main.temp} °C`;
   city.textContent = data.name;
   weatherDesc.textContent = data.weather[0].description;
   windDesc.textContent = `${data.wind.speed} km/h`;
   humidityDesc.textContent = `${data.main.humidity} %`;

   info.style.display = 'none';
   mainContainer.style.display = 'block';
   mainWeather.style.display = 'flex';
   subWeather.style.display = 'flex';
}
