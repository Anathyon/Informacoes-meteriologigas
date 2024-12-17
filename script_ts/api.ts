export interface WeatherData {
    cidade: string
    temperatura: number
    descricao: string
    umidade: number
    vel_vento: number
    timezone: number
}

export const fetchclima = async (cidade: string): Promise<WeatherData> => {
    const apiKey = "" // Para funcionar digite sua chave de api da openweather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) throw new Error('Erro ao buscar dados do clima')
    return {
        cidade: data.name,
        temperatura: data.main.temp,
        descricao: data.weather[0].description,
        umidade: data.main.humidity,
        vel_vento: data.wind.speed,
        timezone: data.timezone
    }
}

export const fetchunsplash = async (cidade: string): Promise<string> => {
    const chave_api_unsplash = "" // Para funcionar digite sua chave de api da unsplash
    const url = `https://api.unsplash.com/search/photos?query=${cidade}&client_id=${chave_api_unsplash}`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.results.length === 0) throw new Error('Erro ao buscar imagem no Unsplash')

    return data.results[0].urls.full
}

export const fetchCidadePorCoordenadas = async (latitude: number, longitude: number): Promise<string> => {
    const apiKey = ""  // Para funcionar digite sua chave de api da openweather 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt_br`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) throw new Error('Erro ao buscar cidade pelas coordenadas')
    return data.name
}
