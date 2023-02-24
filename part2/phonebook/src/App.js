import { useState, useEffect } from 'react'
import axios from "axios"
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [filterActive, setFilterActive] = useState(false)
  const [filterName, setFilterName] = useState('');

  useEffect( () => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
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


  const handleSubmit =(event) => {

    event.preventDefault();

    let validEntry = true;

    if(newName === "" || newNumber === "") {
      validEntry = false;
      alert("please enter valid information in all fields to submit");
    }
    
    for (const person of persons) {
      if(newName === person.name) {
        alert( `${newName} is already added to phonebook`)
        validEntry = false;
        break;
      }
    }
   
    if(validEntry === true) {
      const newPerson = {name: newName, number: newNumber};
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
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
      />

  </div>

  )
}

export default App