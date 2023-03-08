const fetch = require('cross-fetch');

class Weather {
    constructor() {
        this.apiKey = process.env.METEO_API_TOKEN;
    }

    getWeather(city) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    }
}

module.exports = Weather;