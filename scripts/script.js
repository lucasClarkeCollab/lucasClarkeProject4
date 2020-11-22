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
        }
    }).then(function(results){
        let currentTemp = Math.ceil(results.main.temp);
        let minTemp = Math.ceil(results.main.temp_min);
        let maxTemp = Math.ceil(results.main.temp_max);
        $('.whatCity').hide();
        $('.weatherResults').fadeIn("slow");
        $('.weatherResults').append(`
        <img src="./assets/Clouds.svg" alt="${results.weather[0].description}">
        <h2>${results.name}, ${results.sys.country}</h2>
        <p>${results.weather[0].description}</p>
        <p><span class="tempTitle">Currently</span> ${currentTemp}°C</p>
        <p><span class="tempTitle">Min.</span> ${minTemp}°C | <span class="tempTitle">Max.</span> ${maxTemp}°C</p>
        `)
        console.log(results);
        console.log(results.sys.sunset, results.dt);
        //Cloudy Weather Results
        if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset){
            $('section').removeClass('default');
            $('section').addClass('cloudy');
        } else if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('section').removeClass('default');
            $('section').addClass('nightCloudy');
        } else if (results.weather[0].id === 804) {
            $('section').removeClass('default');
            $('section').addClass('overcast');
        }
        //Stormy Weather Results
        if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('section').removeClass('default');
            $('section').addClass('storm');
        } else if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('section').removeClass('default');
            $('section').addClass('nightStorm');
        }
        //Drizzly, Rainy, Snowy and Atmospheric Weather Results
        if (results.weather[0].id >= 300 && results.weather[0].id <= 781 && results.dt > results.sys.sunrise && results.dt < results.sys.sunset) {
            $('section').removeClass('default');
            $('section').addClass('overcast');
        } else if (results.weather[0].id >= 300 && results.weather[0].id <= 781 && results.dt > results.sys.sunrise && results.dt > results.sys.sunset) {
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
        }
    })
}

weatherApp.eventListener = () => {
    $('form').on('submit', function(e){
        e.preventDefault();
        city = $('input').val();
        countryCode = $('select').val();
        if (countryCode === '' || countryCode === 'NA') {
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