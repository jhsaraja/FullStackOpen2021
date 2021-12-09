import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234567890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>          
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )

}

export default App
