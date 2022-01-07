import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchString, setNewSearchString] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {        
          setPersons(initialPersons)      
        }) 
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {    
    event.preventDefault()   
    console.log('Add button clicked', event.target)  

    //let pos = persons.findIndex(person => person.name === newName);
    const currentPerson = persons.filter(person => person.name === newName);
    console.log("Is in array already: ",currentPerson)

    if (currentPerson.length > 0) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (result === true) {
        console.log("Update old object")
        const oldId = currentPerson[0].id
        const changedNote = { ...currentPerson[0], number: newNumber }

        personService
          .update(oldId, changedNote)
            .then(returnedPerson => {        
              setPersons(persons.map(person => person.id !== oldId ? person : returnedPerson))      
            }) 
        return
      } else {
        return
      }
    }

    const personObject = { 
      name: newName,
      number: newNumber,
    } 
    
    personService
      .create(personObject)
        .then(returnedPerson => {        
          setPersons(persons.concat(returnedPerson))  
          setNewName('') 
          setNewNumber('') 
    })
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

  const deletePerson = (id) => {
    console.log(`Remove object with id ${id}`)
    const person = persons.find(person => person.id === id)

    const result = window.confirm(`Delete ${person.name}`);
    console.log(result)

    if (result === true) {
      personService
        .remove(id)
          .then(() => {   
            setPersons(persons.filter(person => person.id !== id))    
          })  
    }
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
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
