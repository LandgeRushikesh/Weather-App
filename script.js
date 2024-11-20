
let APIKey = `916aadbc8a2241c004d71a5301fdcda5`

let resTemp = document.querySelector(".res-temp")
let reshumidity = document.querySelector(".res-humidity")
let resWind = document.querySelector(".res-wind") 
let city = document.querySelector(".city") 
let searchBar = document.querySelector(".search-bar")
let searchBtn = document.querySelector(".search-btn")

let weather = async(cityname) =>{
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)

    let temp = data.main.temp
    let wind = data.wind.speed
    let humidity = data.main.humidity
    cityname = data.name

    resTemp.innerText = `${temp}°C`
    city.innerText = cityname
    reshumidity.innerText = `${humidity}%`
    resWind.innerText = `${wind} m/s`
}

searchBtn.addEventListener("click",()=>{
    let cityname = searchBar.value
    weather(cityname)
})

