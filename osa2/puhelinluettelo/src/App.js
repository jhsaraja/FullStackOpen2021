import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchString, setNewSearchString] = useState('')

  const addPerson = (event) => {    
    event.preventDefault()   
    console.log('Add button clicked', event.target)  

    let pos = persons.findIndex(person => person.name === newName);
    console.log("Is in array already: ",pos)

    if (pos > -1) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const personObject = { 
      name: newName,
      number: newNumber,
    } 
  
    setPersons(persons.concat(personObject))
    setNewName('') // clean input field
    setNewNumber('') // clean input field
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  const handleSearchStringChange = (event) => {    
    console.log(event.target.value)    
    setNewSearchString(event.target.value)  
  }

  const personsToShow = newSearchString    
  ? persons.filter(person => person.name.toLowerCase().includes(newSearchString.toLowerCase()))    
  : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        key="SearchFilter" 
        newSearchString={newSearchString} 
        handleSearchStringChange={handleSearchStringChange} 
      />
      <h2>Add a new</h2>
      <PersonForm 
        key="PersonForm" 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons 
        key="Persons" 
        personsToShow={personsToShow}
      />
    </div>
  )

}

export default App
