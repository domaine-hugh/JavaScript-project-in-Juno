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
        app.currentTimeTittleBackground(); //Change header tittle gif background
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

app.currentTimeTittleBackground = () => {
    if (app.currentWeaterCode === 200 || app.currentWeaterCode === 201 || app.currentWeaterCode === 202 || app.currentWeaterCode === 230 || app.currentWeaterCode === 231 || app.currentWeaterCode === 232 || app.currentWeaterCode === 233) { //Thunder day tittle background gif
        $('#headerTextArea').toggleClass('thunerTittleTextArea');
    } else if (app.currentWeaterCode === 300 || app.currentWeaterCode === 301 || app.currentWeaterCode === 302 || app.currentWeaterCode === 500 || app.currentWeaterCode === 501 || app.currentWeaterCode === 502 || app.currentWeaterCode === 511 || app.currentWeaterCode === 520 || app.currentWeaterCode === 521 || app.currentWeaterCode === 522) { //Raining day tittle background gif
        $('#headerTextArea').toggleClass('rainingTittleTextArea');
    } else if (app.currentWeaterCode === 600 || app.currentWeaterCode === 601 || app.currentWeaterCode === 602 || app.currentWeaterCode === 610 || app.currentWeaterCode === 611 || app.currentWeaterCode === 612 || app.currentWeaterCode === 621 || app.currentWeaterCode === 622 || app.currentWeaterCode === 623) { //Snowing day tittle background gif
        $('#headerTextArea').toggleClass('snowingTittleTextArea');
    } else if (app.currentWeaterCode === 700 || app.currentWeaterCode === 711 || app.currentWeaterCode === 721 || app.currentWeaterCode === 731 || app.currentWeaterCode === 741 || app.currentWeaterCode === 751) { //Fogging day tittle background gif
        $('#headerTextArea').toggleClass('foggingTittleTextArea');
    } else if (app.currentWeaterCode === 800 ) { //Sunny day tittle background gif
        $('#headerTextArea').toggleClass('clearSkyTittleTextArea');
    } else if (app.currentWeaterCode === 801 || app.currentWeaterCode === 802 || app.currentWeaterCode === 803 || app.currentWeaterCode === 804) { //Cloudy day tittle background gif
        $('#headerTextArea').toggleClass('cloudySkyTittleTextArea'); 
    } else {
        $('#headerTextArea').toggleClass('undefinedTittleTextArea'); 
    };
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
        app.currentTimeTittleBackground(); //Change header tittle gif background
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