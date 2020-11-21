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
        $('.weatherResults').show();
        $('.weatherResults').append(`
        <img src="./assets/Clouds.svg" alt="${results.weather[0].description}">
        <h2>${results.name}, ${results.sys.country}</h2>
        <p>${results.weather[0].description}</p>
        <p><span class="tempTitle">Currently</span> ${currentTemp}°C</p>
        <p><span class="tempTitle">Min.</span> ${minTemp}°C | <span class="tempTitle">Max.</span> ${maxTemp}°C</p>
        `)
    })
}

weatherApp.eventListener = () => {
    $('option').on('click', function(){
        countryCode = $(this).attr('value');
        console.log(countryCode);
    })
    }
    
    $('form').on('submit', function(e){
        e.preventDefault();
        city = $('input').val();
        if (countryCode === '' || countryCode === 'NA') {
            alert('Please select a valid country')
        }
        else {
            weatherApp.getWeather();
            console.log(countryCode);
            return countryCode
        }
    })


$(function () {
    weatherApp.init();
    
});