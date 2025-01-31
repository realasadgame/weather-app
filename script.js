const apiKey = "d31607443d38ef889d579cfd00cfa99b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".condition").innerHTML = data.weather[0].main;

        // Set weather image
        switch (data.weather[0].main.toLowerCase()) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "haze":
                weatherIcon.src = "images/haze.png";
                break;
            case "smoke":
                weatherIcon.src = "images/smoke.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Event listener for "Enter" key press
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Default weather display (optional)
window.onload = () => {
    checkWeather("New York"); // Default city
};
