apikey = "uiFib03DmfeI7djP0XqzOApBx3I3W2RT";

const dateAndTime = document.querySelector(".todayDate");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humiditySpan");
const cloud = document.querySelector(".cloudSpan");
const wind = document.querySelector(".windSpan");
const weatherImg = document.querySelector(".weatherImg");
const input = document.getElementById(".cityInput");
const searchBtn = document.querySelector(".searchBtn");


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "accept-encoding": "deflate, gzip, br",
  },
};

let cityName = "Mumbai";

const url = `https://api.tomorrow.io/v4/weather/realtime?location=${cityName}&apikey=${apikey}`;



fetch(url, options)
  .then((response) => response.json())
  .then((apiData) => {
    console.log(apiData);
    dateAndTime.innerText = apiData.data.time;
    city.innerText = apiData.location.name;
    temp.innerText = apiData.data["values"].temperature;
    humidity.innerText = apiData.data["values"].humidity;
    cloud.innerText = apiData.data["values"].cloudCover;

    if (
      apiData.data.values.weatherCode === 1000 ||
      apiData.data.values.weatherCode === 1100 ||
      apiData.data.values.weatherCode === 1001 ||
      apiData.data.values.weatherCode === 1002
    ) {
      weatherImg.src = "./assets/clear.svg";
    } else if (
      apiData.data.values.weatherCode === 1100 ||
      apiData.data.values.weatherCode === 1101 ||
      apiData.data.values.weatherCode === 1102
    ) {
      weatherImg.src = "./assets/cloud.svg";
    } else if (apiData.data.values.weatherCode === 8000) {
      weatherImg.src = "./assets/storm.svg";
    } else if (
      apiData.data.values.weatherCode === 4001 ||
      apiData.data.values.weatherCode === 4200 ||
      apiData.data.values.weatherCode === 4201
    ) {
      weatherImg.src = "./assets/rain.svg";
    } else if (
      apiData.data.values.weatherCode === 2000 ||
      apiData.data.values.weatherCode === 2100 ||
      apiData.data.values.weatherCode === 2101 ||
      apiData.data.values.weatherCode === 2102
    ) {
      weatherImg.src = "./assets/fog.svg";
    } else if (
      apiData.data.values.weatherCode === 5000 ||
      apiData.data.values.weatherCode === 5001 ||
      apiData.data.values.weatherCode === 5002 ||
      apiData.data.values.weatherCode === 5100 ||
      apiData.data.values.weatherCode === 5101 ||
      apiData.data.values.weatherCode === 5102
    ) {
      weatherImg.src = "./assets/snow.svg";
    } else {
      weatherImg.src = "./assets/clear.svg";
    }

    wind.innerText = apiData.data.values.windSpeed;
  })
  .catch((error) => {
    console.error(error);
  });

searchBtn.addEventListener('click', () => {
  console.log("clicked");
  cityName = input.value;
  console.log(cityName);
});


async function getWeatherData() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
