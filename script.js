let cityname = "London"
let APIKey = `916aadbc8a2241c004d71a5301fdcda5`
let url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=metric`

let fun = async() =>{
    let response = await fetch(url)
    let data = response.json()
    console.log(data)
}

fun()