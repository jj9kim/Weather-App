import { useState } from "react";
import "./App.css";
import Weather from "./weather";

function App() {
  let idValue = 0;
  let arr = [0, 8, 16, 24, 32];
  let days = [];
  let value = "";
  let lon = "";
  let lat = "";

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState([]);

  const findCity = () => {
    let input = document.querySelector(".input-answer");
    input.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        value = e.target.value;
        fetchCoord();
      }
    });
  };

  const fetchCoord = async () => {
    setLoading(true);
    try {
      let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=98ad45ef8c803119cc2dcec1383c862a&q=${value}`;
      const response1 = await fetch(url1);
      const temp1 = await response1.json();
      setLoading(false);
      setCity(temp1);
      lon = temp1.coord.lon;
      lat = temp1.coord.lat;
      let inputValue = document.getElementById("title-page");
      inputValue.classList.add("active");
      fetchWeather();
      let inputVal = document.getElementById("input-answer");
      inputVal.classList.remove("active");
      inputVal.placeholder = "Enter a city...";
    } catch (error) {
      setLoading(false);
      let inputVal = document.getElementById("input-answer");
      inputVal.classList.add("active");
      document.querySelector(".input-answer").value = "";
      inputVal.placeholder = "City not found, try again...";
      console.log(error);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=98ad45ef8c803119cc2dcec1383c862a`;
      const response = await fetch(url);
      const temp = await response.json();
      setLoading(false);
      setWeather(temp);
      idValue = temp.city.id;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    let inputValue = document.getElementById("weather-cont");
    inputValue.classList.add("active");
    document.querySelector(".input-answer").value = "";
  };

  for (let i = 0; i < arr.length; i++) {
    try {
      days[i] = {
        temp: Math.round(weather.list[arr[i]].main.temp - 273.15),
        desc: weather.list[arr[i]].weather[0].description,
        date: weather.list[arr[i]].dt_txt,
        icon: weather.list[arr[i]].weather[0].icon,
        name: weather.city.name,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Weather key={idValue} days={days} findCity={findCity} />
    </main>
  );
}

export default App;
