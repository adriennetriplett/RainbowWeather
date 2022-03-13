const url = "https://api.openweathermap.org/data/2.5/";
const key = config.key;

const searchbox = document.querySelector(".search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${url}weather?q=${query}&units=imperial&APPID=${key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {

    let city = document.querySelector('.location .city', 'location.state');
    city.innerText = `${weather.name}`, `${weather.state}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let weather_description = document.querySelector('.current .description');
    weather_description.innerText = weather.weather[0].description;

    let weather_icon = document.querySelector('.current .weather-icon img');
    //console.log(weather.weather[0].icon);
    weather_icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

}

function dateBuilder(d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day}, ${month}, ${date} ${year}`;
}