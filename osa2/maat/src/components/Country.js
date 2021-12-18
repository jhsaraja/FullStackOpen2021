import React from 'react' 

const Country = ({ country, extraData }) => {
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
      </div>
    )
  } else {
    return (
      <p>{country.name.common}</p>
    )
  }
}

export default Country