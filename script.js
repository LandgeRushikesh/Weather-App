
let APIKey = `916aadbc8a2241c004d71a5301fdcda5`

let resTemp = document.querySelector(".res-temp")
let reshumidity = document.querySelector(".res-humidity")
let resWind = document.querySelector(".res-wind") 
let city = document.querySelector(".city") 
let searchBar = document.querySelector(".search-bar")
let searchBtn = document.querySelector(".search-btn")
let description = document.querySelector(".description")

let weather = async(cityname) =>{
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=metric`
    try {
        let response = await fetch(url)
        if(!response.ok){
            throw new Error("City Not Found!!!");
        }
        let data = await response.json()
        console.log(data)
        let temp = data.main.temp
        let wind = data.wind.speed
        let humidity = data.main.humidity
        let desc = data.weather[0].main
        if (desc === "Rain" || desc === "Drizzle" || desc === "Thunderstorm") {
            description.innerText = `It's going to rain! Carry an umbrella.`
        } else if (desc === "Clear") {
            description.innerText = "It's a sunny day!"
        } else if (desc === "Clouds") {
            description.innerText = "It's a cloudy day."
        } else if (desc === "Snow") {
            description.innerText = "It's snowing! Stay warm."
        } 
        else if(desc === "Mist"|| desc === "Smoke" || desc === "Haze"||desc === "Dust" || desc === "Fog" || desc ==="Sand"){
            description.innerText = " Hazy and foggy"
        }
        else {
            description.innerText = `Weather condition is,${desc}`
        }

        cityname = data.name
    
        resTemp.innerText = `${temp}°C`
        city.innerText = cityname
        reshumidity.innerText = `${humidity}%`
        resWind.innerText = `${wind} m/s`
    } catch (error) {
        alert("City Not Found!!")
    }
}

searchBtn.addEventListener("click",()=>{
    let cityname = searchBar.value
        weather(cityname)
})

