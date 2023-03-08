import { useState, useEffect } from 'react'
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import usePersons from "./services/persons"


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [filterActive, setFilterActive] = useState(false)
  const [filterName, setFilterName] = useState('');

  useEffect( () => {
    
    usePersons.getAll()
    .then(initialPersons => setPersons(initialPersons))
  },[])

  const handleFilter = (e) => {

    const newFilterName = e.target.value;
    setFilterName(newFilterName)

    if(newFilterName !== "") {
      setFilterActive(true)
    } else setFilterActive(false)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const numberChange = (id) => {
    const newPerson = {name: newName, number: newNumber}
    usePersons.update(id, newPerson)
      .then(updatedPerson => {
        setPersons(persons.map(
          person => person.id !== id ? person: updatedPerson
        ))
        setNewName('');
        setNewNumber('');
      })
  }

  const handleSubmit =(event) => {

    event.preventDefault();

    let validEntry = true;
    let numberChangeOnly = false;

    if(newName === "" || newNumber === "") {
      validEntry = false;
      alert("please enter valid information in all fields to submit");
    }
    
    for (const person of persons) {
      if(newName.toLowerCase() === person.name.toLowerCase()) {
        if (newNumber === person.number) {
          alert( `${newName} is already added to phonebook`)
          validEntry = false;
        }
        else {
          if(window.confirm(`${person.name} is already added to phonebook, 
          replace old number with a new one?`)) {
            validEntry = true;
            numberChangeOnly = true;
            numberChange(person.id);
          }
        }
        break;
      }
    }
   
    if(validEntry === true && numberChangeOnly === false) {
      const newPerson = {name: newName, number: newNumber};
      usePersons.create(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const handleDelete = (id, name) => {

    if(window.confirm(`Delete ${name} ?`)) {
      usePersons.remove(id)
      .then(deletedNote => {
        setPersons(persons.filter(
          person => person.id !==id
        ))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName = {filterName} handleFilter = {handleFilter} />

      <br></br>

      <PersonForm 
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        handleSubmit = {handleSubmit}
      />

      <h2>Numbers</h2>
      <Contacts 
        persons = {persons} 
        filterActive = {filterActive} 
        filterName = {filterName}
        handleDelete = {handleDelete}
      />

  </div>


  )
}

export default App