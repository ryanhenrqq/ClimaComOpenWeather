function fetchCoords(input) {
    const key = localStorage.getItem("user-api-key")
    if (!key) {
        callGlobalError("Erro de Chave API", "Não foi detectado nenhuma chave API. Cancelando a operação.")
        return
    }
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=${key}`
    console.log("Log: Fetching Coordinates, wait a second.")

    input.value = ""

    fetch(url)
    .then(call => call.json())
    .then(data => {
        const result = data[0]
        let state
        console.log(result)
        if (!result.state) {
            state = "Desconhecido"
        } else {
            state = result.state
        }
        fetchWeatherData(result.name, state, result.country, result.lat, result.lon, input)
    })
    .catch(message => callGlobalError("CallBack: FetchCoords", message))
}

function fetchWeatherData(cityName, state, country, lat, lon, input) {
    const key = localStorage.getItem("user-api-key")
    setUserGui("index", "content")
    console.log(cityName, state, country, lat, lon, input.value)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

    const aveCelsius = document.getElementById("average-degree")
    const maxCelsius = document.getElementById("max-degree")
    const minCelsius = document.getElementById("min-degree")
    const aveFahrenheit = document.getElementById("average-fah")

    fetch(url)
    .then(call => call.json())
    .then(data => {
        aveCelsius.textContent = `${Math.round(data.main.temp)}°C`
        maxCelsius.innerHTML = `<img src="./components/res/icon/pan-up.svg" alt="Seta Para Cima">${data.main.temp_max}°C`
        minCelsius.innerHTML = `<img src="./components/res/icon/pan-down.svg" alt="Seta Para Baixo">${data.main.temp_min}°C`
        aveFahrenheit.innerHTML = `<img src="./components/res/icon/shapes.svg" alt="Formatos">${Math.round(((data.main.temp)*9)/5+32)}°F`

        
    })
    .catch(message => callGlobalError("Callback: Fetch Weather", message))
}