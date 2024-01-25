import React from "react";

function Temp({ days }) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < days.length; i++) {
    let date = new Date(days[i].date);
    let day = date.getDay();
    days[i].date = daysOfWeek[day];
  }

  return (
    <main>
      <div id="weather-cont" className="weather-container">
        <div id="weather-page">
          {days[0] && <img src={require(`./images/${days[0]?.icon}.png`)} />}
          <div className="weather-desc">
            <p className="today">Today</p>
            <h2 className="city">{days[0]?.name}</h2>
            <p>Temperature: {days[0]?.temp}°C</p>
            <p>{days[0]?.desc}</p>
          </div>
        </div>
        <div className="all-days">
          {days
            .filter((subArray, index) => subArray.length > 0 || index != 0)
            .map((day, index) => {
              return (
                <div key={index} className="future-days">
                  <p>{day.date}</p>
                  <img src={require(`./images/${day.icon}.png`)} />
                  <p>{day.temp}°C</p>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Temp;
