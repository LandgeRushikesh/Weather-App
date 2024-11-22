let APIKey = `916aadbc8a2241c004d71a5301fdcda5`;

let resTemp = document.querySelector(".res-temp");
let reshumidity = document.querySelector(".res-humidity");
let resWind = document.querySelector(".res-wind");
let city = document.querySelector(".city");
let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search-btn");
let description = document.querySelector(".description");
let app = document.querySelector(".weather-app");

let weatherONCityName = async (cityname) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=metric`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found!!!");
    }
    let data = await response.json();
    console.log(data);
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    cityname = data.name;
    let desc = data.weather[0].main;
    let icon = data.weather[0].icon;
    setWeatherDescription(desc,icon)

    resTemp.innerText = `${temp}°C`;
    city.innerText = cityname;
    reshumidity.innerText = `${humidity}%`;
    resWind.innerText = `${wind} m/s`;
  } catch (error) {
    description.innerText = "Sorry, we couldn't find the weather data for that city."
  }
};

let getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    weatherONLocation(latitude, longitude);
  });
};

let weatherONLocation = async (latitude, longitude) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found!!!");
    }
    let data = await response.json();
    console.log(data);
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    cityname = data.name;
    let desc = data.weather[0].main;
    let icon = data.weather[0].icon;
    setWeatherDescription(desc,icon)

    resTemp.innerText = `${temp}°C`;
    city.innerText = cityname;
    reshumidity.innerText = `${humidity}%`;
    resWind.innerText = `${wind} m/s`;
  } catch (error) {
    description.innerText = "Sorry, we couldn't find the weather data for that city."
  }
};

let setWeatherDescription = (desc,icon) => {
  
  if (desc === "Rain" || desc === "Drizzle" || desc === "Thunderstorm") {
    description.innerText = `It's going to rain! Carry an umbrella.`;
  } else if (desc === "Clear") {
    // Assuming you can check whether it's day or night, you can do something like:
    if (icon[icon.length - 1] === "d") {
      description.innerText = "It's a sunny day!";
      app.style.backgroundImage = "url('sunny-day.jpeg')";
    } else {
      description.innerText = "Clear skies tonight!";
      app.style.backgroundImage = "url('skies-night.jpeg')";
    }
  } else if (desc === "Clouds") {
    if (icon[icon.length - 1] === "d") {
      description.innerText = "It's a cloudy day.";
    } else {
      description.innerText = "Cloudy night ahead.";
      app.style.backgroundImage = "url('cloudy-night.jpeg')";
    }
  } else if (desc === "Snow") {
    if (icon[icon.length - 1] === "d") {
      description.innerText = "It's snowing! Stay warm.";
      app.style.backgroundImage = "url('snow-fall-day.jpeg')";
    } else {
      description.innerText = "Snowfall at night! Stay cozy.";
      app.style.backgroundImage = "url('snow-fall-night.jpeg')";
    }
  } else if (desc === "Mist" || desc === "Smoke" || desc === "Haze" || desc === "Dust" || desc === "Fog" || desc === "Sand") {
    if (icon[icon.length - 1] === "d") {
      description.innerText = "Hazy and foggy during the day.";
      app.style.backgroundImage = "url('Hazy-day.jpeg')";
    } else {
      description.innerText = "Hazy and foggy night.";
      app.style.backgroundImage = "url('hazy-night.jpeg')";
    }
  } else {
    description.innerText = `Weather condition is, ${desc}`;
    app.style.backgroundImage = "url('bg-1.jpeg')";
  }
};


window.onload = () => {
  getLocation();
  searchBar.value = "";
};

searchBtn.addEventListener("click", () => {
  let cityname = searchBar.value;
  weatherONCityName(cityname);
});

searchBar.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        searchBtn.click()
    } 
})