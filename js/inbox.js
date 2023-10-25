

function getLocation() {
    return new Promise(function (resolve, reject) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position.coords);
            }, function (error) {
                reject(error);
            });
        } else {
            reject('Geolocalizacion no esta disponible en tu navegador');
        }
    });

}

 function getWeather(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        const apiKey = 'ba0c6186592e59a1197ded18b1d68956';
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=metric';
        console.log('LInk' + apiUrl);

        $.get(apiUrl, function (data) {
            resolve(data);            
        }).fail(function (error) {
            reject(error);
        });
    });

}


$(document).ready(function () {
    getLocation()
        .then(function (coords) {
            return getWeather(coords.latitude, coords.longitude);
        })
        .then(function (data) {
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            // const descriptionElement = document.getElementById('description');
            const iconElement = document.getElementById('weather-icon');
            console.log(data)
            
            locationElement.textContent = data.name;
            temperatureElement.textContent = data.main.temp.toFixed(1) + '°C';
            // descriptionElement.textContent = data.weather[0].description;

            const iconURL = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            iconElement.src = iconURL;

            
        })
        .catch(function (error) {
            const locationElement = document.getElementById('location'); 
            locationElement.textContent = error;
        })

});