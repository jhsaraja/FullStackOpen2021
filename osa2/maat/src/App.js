import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([]) 
 /* const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')*/
  const [newSearchString, setNewSearchString] = useState('') 

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', countries.length, 'countries')
  //console.log(countries)

  const handleSearchStringChange = (event) => {    
    console.log(event.target.value)    
    setNewSearchString(event.target.value)  
  } 

  const countriesToShow = newSearchString    
  ? countries.filter(country => country.name.common.toLowerCase().includes(newSearchString.toLowerCase()))    
  : []   

  return (
    <div>
      <Filter 
        key="SearchFilter" 
        newSearchString={newSearchString} 
        handleSearchStringChange={handleSearchStringChange} 
      />
      <Countries 
        key="Countries" 
        countriesToShow={countriesToShow}
      />
    </div>
  )

}

export default App