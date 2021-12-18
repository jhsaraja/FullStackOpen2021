import React from 'react' 
import Country from './Country'

const Countries = ({ countriesToShow }) => {
  console.log("countriesToShow: ",countriesToShow)
  console.log("Count: ",countriesToShow.length)

  if (countriesToShow.length > 10) {
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>          
          <Country key={country.cca3} country={country} />
        )}
      </div>
    ) 
  } else if (countriesToShow.length === 1) {
    return (
      <div>       
        <Country key={countriesToShow[0].cca3} country={countriesToShow[0]} extraData="1" />
      </div>
    ) 
  } else {
    return(
      <div></div>
    )
  }
}

export default Countries