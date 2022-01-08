import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchString, setNewSearchString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {        
          setPersons(initialPersons)      
        }) 
  }, [])
  console.log('render', persons.length, 'persons')

  const showError = (person) => {
    console.log("Error, failed to update object with id ",person.id) 
    setNotificationType("error")  
    setNotificationMessage(          
      `Information of ${person.name} was already removed from server`        
    )        
    setTimeout(() => {          
      setNotificationMessage(null)        
    }, 5000)   
  }

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
        const changedPerson = { ...currentPerson[0], number: newNumber }

        personService
          .update(oldId, changedPerson)
            .then(returnedPerson => {        
              setPersons(persons.map(person => person.id !== oldId ? person : returnedPerson))   
              setNotificationType("notification")  
              setNotificationMessage(          
                `Updated ${returnedPerson.name}`        
              )   
              setTimeout(() => {          
                setNotificationMessage(null)        
              }, 5000)  
            }) 
          .catch(error => {    
            showError(changedPerson)  
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
          setNotificationType("notification")  
          setNotificationMessage(          
            `Added ${returnedPerson.name}`        
          )  
          setTimeout(() => {          
            setNotificationMessage(null)        
          }, 5000)  
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
            const removedPerson = persons.filter(person => person.id === id)
            console.log(removedPerson)
            setPersons(persons.filter(person => person.id !== id))    
            setNotificationType("notification")  
            setNotificationMessage(          
              `Deleted ${removedPerson[0].name}`        
            )  
            setTimeout(() => {          
              setNotificationMessage(null)        
            }, 5000) 
          })  
    }
  }

  const personsToShow = newSearchString    
  ? persons.filter(person => person.name.toLowerCase().includes(newSearchString.toLowerCase()))    
  : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className={notificationType} />
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
