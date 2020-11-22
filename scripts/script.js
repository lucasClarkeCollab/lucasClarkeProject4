// // Create an event listener for the form submit
// // Data is retrieved and used in ajax call to Open Weather API
// // Weather returned from the API call is displayed to the user
// CSS outcomes are varied depending on the quality of weather for the given location


//Namespace object
const weatherApp = {};

weatherApp.init = () => {
    weatherApp.eventListener();
    $('.weatherResults').hide();
}

let countryCode = "";
let city = "";


weatherApp.getWeather = () => {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?',
        method: 'GET',
        dataType: 'json',
        data: {
            q: `${city},${countryCode}`,
            APPID: '92d78e5b6220af8048ce06de33b61699',
            units: 'Metric'
        },
        cache: false
    }).then(function (results) {
        let currentTemp = Math.ceil(results.main.temp);
        let minTemp = Math.ceil(results.main.temp_min);
        let maxTemp = Math.ceil(results.main.temp_max);
        $('.whatCity').hide();
        $('.weatherResults').fadeIn("slow");
        $('.weatherResults').append(`
        <div class="iconContainer"></div>
        <h2>${results.name}, ${results.sys.country}</h2>
        <p>${results.weather[0].description}</p>
        <p><span class="tempTitle">Currently</span> ${currentTemp}°C</p>
        <p><span class="tempTitle">Min.</span> ${minTemp}°C | <span class="tempTitle">Max.</span> ${maxTemp}°C</p>
        `)
        console.log(results);
        console.log(results.sys.sunset, results.dt);
        //Cloudy Weather Results
        if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('cloudy');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
        } else if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightCloudy');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
        } else if (results.weather[0].id === 804 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
        } else if (results.weather[0].id === 804 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
        }
        //Stormy Weather Results
        if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('storm');
            $('.iconContainer').append(`<img src="./assets/thunderStorm.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightStorm');
            $('.iconContainer').append(`<img src="./assets/thunderStorm.svg" alt="${results.weather[0].description}">`);
        }
        //Drizzly, Rainy, Snowy and Atmospheric Weather Results
        if (results.weather[0].id >= 300 && results.weather[0].id <= 531 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/rain.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 300 && results.weather[0].id <= 531 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/rain.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 600 && results.weather[0].id <= 622 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/snow.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 600 && results.weather[0].id <= 622 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/snow.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 701 && results.weather[0].id <= 781 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/fogHaze.svg" alt="${results.weather[0].description}">`);
        } else if (results.weather[0].id >= 701 && results.weather[0].id <= 781 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/fogHaze.svg" alt="${results.weather[0].description}">`)
        };
        // Clear and Sunny Weather Results
        if (results.weather[0].id === 800 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('sunny');
            $('.iconContainer').append(`<img src="./assets/sunny.svg" alt="${results.weather[0].description}">`)
        } else if (results.weather[0].id === 800 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightClear');
            $('.iconContainer').append(`<img src="./assets/nightClearMoon.svg" alt="${results.weather[0].description}">`)
        }
    }, function(){
        alert(`Whoa! Are you sure that place exists?`)
    })
}

weatherApp.eventListener = () => {
    $('form').on('submit', function(e){
        e.preventDefault();
        city = $('input').val();
        countryCode = $('select').val();
        if (countryCode === '') {
            alert('Please select a valid country')
        }
        else {
            weatherApp.getWeather();
            console.log(countryCode);
            return countryCode
        }
    })
}


$(function () {
    weatherApp.init();
})