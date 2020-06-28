export default class ApiService {
    _apiBase = 'https://api.openweathermap.org/data/2.5/weather'
    apikey = '70e1ed322b02acbc57d443dd91065f3e'
    async getWeather(lat, lon) {
        const res = await fetch(`${this._apiBase}?lat=${lat}&lon=${lon}&appid=${this.apikey}&lang=ru`)
        if(!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`)
          }
          return await res.json()
    }
}