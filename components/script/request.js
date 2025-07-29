function fetchCoords(input) {
    const key = localStorage.getItem("user-api-key")
    if (!key) {
        callGlobalError("Erro de Chave API", "Não foi detectado nenhuma chave API. Cancelando a operação.")
        input.value = ""
        input.disabled = false
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
    .catch(message => {
        callGlobalError("Erro ao requisitar dados! (Callback da API: fetchCoords)", message)
        input.disabled = false
    })
}

function fetchWeatherData(cityName, state, country, lat, lon, input) {
    const key = localStorage.getItem("user-api-key")
    setUserGui("index", "all")
    console.log(cityName, state, country, lat, lon, input.value)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

    const aveCelsius = document.getElementById("average-degree")
    const maxCelsius = document.getElementById("max-degree")
    const minCelsius = document.getElementById("min-degree")
    const aveFahrenheit = document.getElementById("average-fah")

    const cidadeNome = document.getElementById("cidade-nome")
    const stateCountry = document.getElementById("estado-pais")
    const localTime = document.getElementById("horario-local")
    const sunriseTime = document.getElementById("sunrise-time")
    const sunsetTime = document.getElementById("sunset-time")

    fetch(url)
    .then(call => call.json())
    .then(data => {
        aveCelsius.textContent = `${Math.round(data.main.temp)}°C`
        maxCelsius.innerHTML = `<img src="./components/res/icon/pan-up.svg" alt="Seta Para Cima">${data.main.temp_max}°C`
        minCelsius.innerHTML = `<img src="./components/res/icon/pan-down.svg" alt="Seta Para Baixo">${data.main.temp_min}°C`
        aveFahrenheit.innerHTML = `<img src="./components/res/icon/shapes.svg" alt="Formatos">${Math.round(((data.main.temp)*9)/5+32)}°F`

        let nascer = new Date(data.sys.sunrise * 1000)
        let escurecer = new Date(data.sys.sunset * 1000)

        cidadeNome.textContent = `${cityName}`
        stateCountry.textContent = `${state}, ${country}`
        localTime.textContent = `${getTimeNow(data.timezone)}`
        sunriseTime.textContent = `${formatTimeWithOffset(nascer, data.timezone)}`
        sunsetTime.textContent = `${formatTimeWithOffset(escurecer, data.timezone)}`

    })
    .catch(message => {
        callGlobalError("Callback: Fetch Weather", message)
        input.disabled = false
    })
}

function getTimeNow(timezone) {
    const timenow = Date.now()
    const localtime = new Date(timenow + (timezone * 1000))
    return localtime.toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC"
    })
}
function formatTimeWithOffset(dateUTC, offsetSeconds) {
  let dateAdjusted = new Date(dateUTC.getTime() + offsetSeconds * 1000);
  return dateAdjusted.toLocaleTimeString("pt-br", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  })
}