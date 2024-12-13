export const fetchclima = async (cidade) => {
    const apiKey = "aae76c4eb7f4211e7e1c7dd47741cd39";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok)
        throw new Error('Erro ao buscar dados do clima');
    return {
        cidade: data.name,
        temperatura: data.main.temp,
        descricao: data.weather[0].description,
        umidade: data.main.humidity,
        vel_vento: data.wind.speed,
        timezone: data.timezone
    };
};
export const fetchunsplash = async (cidade) => {
    const chave_api_unsplash = "mHSrgrev3iMYkSn2GCqr2tw17ywE3fClANKxdEHBdPc";
    const url = `https://api.unsplash.com/search/photos?query=${cidade}&client_id=${chave_api_unsplash}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.results.length === 0)
        throw new Error('Erro ao buscar imagem no Unsplash');
    return data.results[0].urls.full;
};
export const fetchCidadePorCoordenadas = async (latitude, longitude) => {
    const apiKey = "aae76c4eb7f4211e7e1c7dd47741cd39";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok)
        throw new Error('Erro ao buscar cidade pelas coordenadas');
    return data.name;
};
