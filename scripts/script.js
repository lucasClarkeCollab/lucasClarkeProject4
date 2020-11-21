// // Create an event listener for the form submit
// // Data is retrieved and used in ajax call to Open Weather API
// // Weather returned from the API call is displayed to the user
// CSS outcomes are varied depending on the quality of weather for the given location


//Namespace object
const weatherApp = {};

weatherApp.init = () => {
    weatherApp.eventListener();
}

let countryCode = "";
let city = "";


// weatherApp.getWeather = () => {
//     $.ajax({
//         url: 'http://api.openweathermap.org/data/2.5/weather?',
//         method: 'GET',
//         dataType: 'json',
//         data: {
//             q: `${city},${countryCode}`
//             APPID: '92d78e5b6220af8048ce06de33b61699',
//             units: 'Metric'
//         }
//     }).then(function(results){
//         console.log(results)
//     })
// }

weatherApp.eventListener = () => {
    $('.countries').on('click', function(){
        countryCode = $(this).attr('value');
    })
    $('form').on('submit', function(e){
        e.preventDefault();
        city = $('input').val();
        if (countryCode === '' || countryCode === 'NA') {
            alert('Please select a valid country')
        }
        else {
            console.log(countryCode);
            return countryCode
        }
    })
}

$(function () {
    weatherApp.init();
});