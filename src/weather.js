import Temp from "./temp";

function Weather({ days, findCity }) {
  return (
    <main className="container">
      <div id="title-page" className="">
        <img src={require(`./images/03n.png`)} />
        <h2>Weather Forecast</h2>
      </div>
      <div className="new-container">
        <input
          id="input-answer"
          className="input-answer"
          type="text"
          placeholder="Enter a city..."
          onInput={() => findCity()}
        />
        <Temp days={days} />
      </div>
    </main>
  );
}

export default Weather;
