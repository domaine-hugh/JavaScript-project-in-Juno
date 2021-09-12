const app = {};
app.locationKey = '4f0ef52ad4ea4a7885160d22767b99b3';
app.locationBaseUrl = "https://ipgeolocation.abstractapi.com/v1/";

app.weatherKey = `de365115a7284ad4bf2cd265044b2341`;
app.weatherBaseUrl = `https://api.weatherbit.io/v2.0/current`;
// Setting global variables for saving data button function
app.weatherCity = '';
app.weatherCountry = '';
app.currentWeaterCode = '';
app.currentWeatherDescription = '';
app.currentWeatherTime = '';
app.currentWeatherDayNight = '';
app.currentWeatherFeelsLike = '';
app.currentWeatherTemperature = '';
app.currentWeatherWindSpeed = '';
app.currentWeatherWindDirection = '';
app.currentWeathterHumidity = '';
app.currentWeatherPressue = '';

app.temperatureUnitIsCentigradeListner = true; //Centigrade default

app.gifKey = `qqanPZz7sLSn7kVSm7oDDrm4Az3ZQ1XH`;
app.gifBaseUrl = `http://api.giphy.com/v1/gifs/search`;

app.putGifOnPage = data => { //Adding Gifs on page
    data.forEach(function (gifObject) {
        const gifhtml = `
                <div class="gifBox">
                    <div class="imgBox">
                        <img src="${gifObject.images.original.url} alt="${gifObject.title}"
                    </div>
                    <p class="gifTittle">${gifObject.title}</p>
                </div>
           `
        $('.gifDisplayDiv').append(gifhtml);
    });
};

app.getWeatherGif = (query) => {
    $.ajax({ //Get data from GIF API
        url: app.gifBaseUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: app.gifKey,
            q: query,
            format: 'json',
            limit: 3 //Limit 3 gifs
        }
    }).then(function (result) { //Put Gifs on pages
        $('.gifDisplayDiv').empty(); // empty gif box to avoid too many gifs
        app.putGifOnPage(result.data);
    });
};

app.locationDataDisplay = (cityName, countryName) => { //City data display on page
    $('.currentCityName').text(`${cityName}, ${countryName}`);
};

app.weatherDataDisplay = (currentTemperture, currentFeelsLikeTemperature, humidity, pressure, windSpeed, windDirection) => { //Weather data display on page
    $('.currentTempertureNumber').text(currentTemperture);
    $('.currentFeelsLikeTemperatureNumber').text(currentFeelsLikeTemperature);
    $('.humidityDisplay').text(`${humidity}%`);
    $('.pressureDisplay').text(`${pressure} mb`);
    $('.windDisplay').text(`${windSpeed} m/s  ${windDirection}`);
};

app.getCurrentWeather = () => {
    $.ajax({  //Get data from weather API
        url: app.weatherBaseUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            key: app.weatherKey,
            city: app.weatherCity,
            country: app.weatherCountry
        }
    }).then(function (result) { //Saving weather data
        console.log(result);
        app.currentWeaterCode = result.data[0].weather.code;
        app.currentWeatherDescription = result.data[0].weather.description;
        app.currentWeatherTime = result.data[0].datetime;
        app.currentWeatherDayNight = result.data[0].pod;
        app.currentWeatherFeelsLike = result.data[0].app_temp;
        app.currentWeatherTemperature = result.data[0].temp;
        app.currentWeatherWindSpeed = result.data[0].wind_spd;
        app.currentWeatherWindDirection = result.data[0].wind_cdir_full;
        //Wind direction use first letter upper case
        const currentWeatherWindDirectionFirstLetterUpperCase = app.currentWeatherWindDirection;
        app.currentWeatherWindDirection = currentWeatherWindDirectionFirstLetterUpperCase[0].toUpperCase() + currentWeatherWindDirectionFirstLetterUpperCase.substr(1);
        app.currentWeathterHumidity = result.data[0].rh;
        app.currentWeatherPressue = result.data[0].pres;
        app.weatherDataDisplay(app.currentWeatherTemperature, app.currentWeatherFeelsLike, app.currentWeathterHumidity, app.currentWeatherPressue, app.currentWeatherWindSpeed, app.currentWeatherWindDirection);
        app.getWeatherGif(app.currentWeatherDescription); //Put current weather description into GIF API to get GIF
        app.currentTimeWallPaper(); //Change wall paper
    })
};

app.getCurrentLocationWeather = () => {
    $.ajax({ //Get data from location API
        url: app.locationBaseUrl,
        method: "GET",
        dataType: 'json',
        data: {
            api_key: app.locationKey
        }
    }).then(function (result) { //Put location data into weather API to get current weather
        app.weatherCity = result.city;
        app.weatherCountry = result.country_code;
        app.locationDataDisplay(app.weatherCity, app.weatherCountry);
        app.getCurrentWeather();
    })
};

app.temperatureUnitTransferMethod = () => { //Unit Transfer function
    const weathterTemperatureInTransfer = app.currentWeatherTemperature.toFixed(1);
    const weatherFeelsLikeTemperatureInTransfer = app.currentWeatherFeelsLike.toFixed(1);
    $('.currentTempertureNumber').text(weathterTemperatureInTransfer);
    $('.currentFeelsLikeTemperatureNumber').text(weatherFeelsLikeTemperatureInTransfer);
    $('#fahrenheitSign').addClass('.onusedSign');
    $('#centigradeSign').removeClass('.onusedSign');
    app.temperatureUnitIsCentigradeListner = !app.temperatureUnitIsCentigradeListner;
};

app.savingtemperatureDataInCentigrade = () => { //Saving data when centigrade is used on page
    const htmlcontent = `
<div class="savingTemperatureDataDisplayDiv">
    <p>The weather in ${app.weatherCity}, ${app.weatherCountry} is:</p>
    <p>${app.currentWeatherDescription}, ${app.currentWeatherTemperature}°C, feels like ${app.currentWeatherFeelsLike}°C.</p>
    <p>Pressure: ${app.currentWeatherPressue} mb.</p>
    <p>Humidity: ${app.currentWeathterHumidity}%.</p>
    <p>Wind: ${app.currentWeatherWindSpeed} m/s  ${app.currentWeatherWindDirection}</p>
    <button>Mark this!</button>
</div>
`
    $('.savingWeatherDataDisplay').append(htmlcontent);
};

app.savingtemperatureDataInFahrenheit = () => { //Saving data when fahrenheit is used on page
    const htmlcontent = `
<div class="savingTemperatureDataDisplayDiv">
    <p>The weather in ${app.weatherCity}, ${app.weatherCountry} is:</p>
    <p>${app.currentWeatherDescription}, ${app.currentWeatherTemperature}°F, feels like ${app.currentWeatherFeelsLike}°F.</p>
    <p>Pressure: ${app.currentWeatherPressue} mb.</p>
    <p>Humidity: ${app.currentWeathterHumidity}%.</p>
    <p>Wind: ${app.currentWeatherWindSpeed} m/s  ${app.currentWeatherWindDirection}</p>
    <button>Mark this!</button>
</div>
`
    $('.savingWeatherDataDisplay').append(htmlcontent);
};

app.currentTimeWallPaper = () => {
    if (app.currentWeatherDayNight === 'd') {
        $('body').toggleClass('dayTimeWallPaper')
    } else if (app.currentWeatherDayNight === 'n') {
        $('body').toggleClass('nightTimeWallPaper')
    }
};

app.init = () => {
    app.getCurrentLocationWeather();

};

$(() => {
    app.init();

    $('.locationInputForm').on(`submit`, function (event) { //Input city name 
        event.preventDefault();
        app.weatherCity = $('#cityNameInput').val();
        app.weatherCountry = $('#countryNameInput').val();
        //City name uses first letter upper case
        const currentWeatherCityFirstLetterUpperCase = app.weatherCity;
        app.weatherCity = currentWeatherCityFirstLetterUpperCase[0].toUpperCase() + currentWeatherCityFirstLetterUpperCase.substr(1);
        //Country abbr uses upper case
        const currentWeatherCountryUpperCase = app.weatherCountry;
        app.weatherCountry = currentWeatherCountryUpperCase.toUpperCase();
        app.locationDataDisplay(app.weatherCity, app.weatherCountry);
        app.getCurrentWeather();
        app.currentTimeWallPaper(); //Change wall paper
    });

    $('#centigradeSign').click(function (event) { //Transfer to Centigrade
        event.preventDefault();
        if (app.temperatureUnitIsCentigradeListner === true) {
            alert(`You already use Centigrade as unit!`)
        } else {
            app.currentWeatherTemperature = (app.currentWeatherTemperature - 32) / 1.8;
            app.currentWeatherFeelsLike = (app.currentWeatherFeelsLike - 32) / 1.8;
            $('.currentFeelsLikeTemperatureSign').text(`°C`);
            app.temperatureUnitTransferMethod();
        }
    });

    $('#fahrenheitSign').click(function (event) { //Transfer to Fahrenheit
        event.preventDefault();
        if (app.temperatureUnitIsCentigradeListner === false) {
            alert(`You already use Fahrenheit as unit!`)
        } else {
            app.currentWeatherTemperature = app.currentWeatherTemperature * 1.8 + 32;
            app.currentWeatherFeelsLike = app.currentWeatherFeelsLike * 1.8 + 32;
            $('.currentFeelsLikeTemperatureSign').text(`°F`);
            app.temperatureUnitTransferMethod();
        }
    });

    $('.savingWeatherDataButton').click(function (event) { //Saving weather data
        event.preventDefault();
        if (app.temperatureUnitIsCentigradeListner === true) {
            app.savingtemperatureDataInCentigrade();
        } else {
            app.savingtemperatureDataInFahrenheit();
        }
    });
});