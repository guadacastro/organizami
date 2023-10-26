

function getLocation() {
    return new Promise(function (resolve, reject) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position.coords);
            }, function (error) {
                reject(new Error('Geolocation is not available in your Browser'));
            });
        } else {
            reject(new Error ('Geolocation is not available in your Browser'));
        }
    });

}

 function getWeather(latitude, longitude) {
   
        const apiKey = 'ba0c6186592e59a1197ded18b1d68956';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        console.log('LInk' + apiUrl);

        return fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Faild to retrieve weather data.');
                }
                return response.json();
            })
            .then(function (data) {
                return data;
            });


}

document.addEventListener('DOMContentLoaded', function() {
    getLocation()
        .then(function (coords) {
            return getWeather(coords.latitude, coords.longitude);
        })
        
        .then(function (data) {
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const iconElement = document.getElementById('weather-icon');

            locationElement.textContent = data.name;
            temperatureElement.textContent = data.main.temp.toFixed(1) + '°C';

            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconElement.src = iconURL;
        })
        .catch(function (error) {
            const locationElement = document.getElementById('location');
            locationElement.textContent = error.message;
        });
});

// $(document).ready(function () {
//     getLocation()
//         .then(function (coords) {
//             return getWeather(coords.latitude, coords.longitude);
//         })
//         .then(function (data) {
//             const locationElement = document.getElementById('location');
//             const temperatureElement = document.getElementById('temperature');
//             // const descriptionElement = document.getElementById('description');
//             const iconElement = document.getElementById('weather-icon');
//             console.log(data)
            
//             locationElement.textContent = data.name;
//             temperatureElement.textContent = data.main.temp.toFixed(1) + '°C';
//             // descriptionElement.textContent = data.weather[0].description;

//             const iconURL = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
//             iconElement.src = iconURL;

            
//         })
//         .catch(function (error) {
//             const locationElement = document.getElementById('location'); 
//             locationElement.textContent = error;
//         })

// });