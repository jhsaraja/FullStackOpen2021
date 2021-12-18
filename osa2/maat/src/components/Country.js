import React, { useState, useEffect } from 'react' 
import axios from 'axios'

const Country = ({ country, extraData, showCountry }) => {
  const [weather, setWeather] = useState('') 

  function showCountryData() {
    showCountry(country.name.common)
  }

  const hook = () => {
    console.log('effect')
    const url = "http://api.weatherstack.com/current?access_key="+process.env.REACT_APP_API_KEY+"&query="+country.capital[0];
    axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setWeather(response.data)
      })
  }
  useEffect(hook, [])
  console.log("weather",weather)

  if (extraData) {
    const languages = country.languages
    console.log("languages",languages)

    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>    
        <ul>
          {Object.entries(country.languages).map(([key, value]) => {
            return (
              <li key={key}>{value}</li>
            );
          })}
        </ul> 
        <p>
          <img src={country.flags.png} alt="Flag" />
        </p> 
        <h2>Weather in {country.capital[0]}</h2>  
        <p>Temperature: {weather.current.temperature} Celcius</p>
        <p>
          <img src={weather.current.weather_icons[0]} alt="Weather icon"/>
        </p>
        <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <p>
        {country.name.common} 
        <button onClick={showCountryData}>Show</button>
      </p>
    )
  }
}

export default Country