const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastList = document.querySelector("#forecast");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=-1.294&lon=36.81&units=metric&appid=b3d35548c4130d29ed2d2c663dcc77b0";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=-1.294&lon=36.81&units=metric&appid=b3d35548c4130d29ed2d2c663dcc77b0";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw error(await response.text());    
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    let desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);

    captionDesc.textContent = `${desc}`;
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    forecastList.innerHTML = "";

    daily.slice(0, 3).forEach(day => {
        const date = new Date(day.dt_txt);
        const li = document.createElement("li");

        li.textContent = `${date.toLocaleDateString("en-US", {
            weekday: "long"
        })}: ${Math.round(day.main.temp)}°C`;

        forecastList.appendChild(li);
    });
}
getForecast();