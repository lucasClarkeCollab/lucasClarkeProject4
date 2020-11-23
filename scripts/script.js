const weatherApp = {};

let countryCode = "";
let city = "";

weatherApp.init = () => {
    weatherApp.eventListener();
    $('.weatherResults').hide();
}

weatherApp.getWeather = () => {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?',
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
        let dayTime = (results.weather[0].icon).endsWith("d");
        $('.whatCity').hide();
        $('.weatherResults').fadeIn("slow");
        $('.weatherResults').append(`
        <div class="iconContainer"></div>
        <h2>${results.name}, ${results.sys.country}</h2>
        <p>${results.weather[0].description}</p>
        <p><span class="tempTitle">Currently</span> ${currentTemp}°C</p>
        <p><span class="tempTitle">Min.</span> ${minTemp}°C | <span class="tempTitle">Max.</span> ${maxTemp}°C</p>
        <div class="refreshIcon"></div>
        `)
        
        //Clear Weather Results
        if (results.weather[0].id === 800 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('sunny');
            $('.iconContainer').append(`<img src="./assets/sunny.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refresh.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id === 800 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightClear');
            $('.iconContainer').append(`<img src="./assets/nightClearMoon.svg" alt="${results.weather[0].description}">`)
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        }
        //Cloudy Weather Results
        if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('cloudy');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refresh.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 801 && results.weather[0].id <= 803 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightCloudy');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}"/>`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id === 804 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}">`)
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refresh.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id === 804 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/clouds.svg" alt="${results.weather[0].description}">`)
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        }
        //Stormy Weather Results
        if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('storm');
            $('.iconContainer').append(`<img src="./assets/thunderStorm.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refresh.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 200 && results.weather[0].id <= 232 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightStorm');
            $('.iconContainer').append(`<img src="./assets/thunderStorm.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        }
        //Drizzly, Rainy, Snowy and Atmospheric Weather Results
        if (results.weather[0].id >= 300 && results.weather[0].id <= 531 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/rain.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 300 && results.weather[0].id <= 531 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/rain.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 600 && results.weather[0].id <= 622 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/snow.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 600 && results.weather[0].id <= 622 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/snow.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 701 && results.weather[0].id <= 781 && dayTime === true) {
            $('h2').addClass('day');
            $('section').removeClass('default');
            $('section').addClass('overcast');
            $('.iconContainer').append(`<img src="./assets/fogHaze.svg" alt="${results.weather[0].description}">`);
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        } else if (results.weather[0].id >= 700 && results.weather[0].id <= 781 && dayTime === false) {
            $('h2').addClass('night');
            $('section').removeClass('default');
            $('section').addClass('nightOvercast');
            $('.iconContainer').append(`<img src="./assets/fogHaze.svg" alt="${results.weather[0].description}">`)
            $('.refreshIcon').append(`<a href="#home" onclick="location.reload()"><img src="./assets/refreshWhite.svg" alt="a refresh icon, click here to go back to the home page!"></a>`)
        }
    }, function(){
        alert(`We couldn't find that city! Please try again.`)
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
            weatherApp.getWeather();;
            return countryCode
        }
    })
}

$(function () {
    weatherApp.init();
})