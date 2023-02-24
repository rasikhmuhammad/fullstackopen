const Contact = ({person}) => {
    return (
      <p>{person.name} - {person.number} </p>
    )
  }
  
  const Contacts = ({persons, filterActive, filterName}) => {
  
    if(!filterActive) {
      return (
        <div>
          {persons.map( (person,index) => 
            <Contact key = {person.name} person = {person} />
          )}
       </div>
      )
    }
    else {
        const filteredPersons = persons.filter( (person) => {
            return (
                person.name.toLowerCase()
                .includes(filterName.toString().toLowerCase())
            )
        })
        return (
            <div>
            {filteredPersons.map( (person) => 
            <Contact key = {person.name} person = {person} />
            )}
      </div>
      )
    }
  
  }

  export default Contacts;
  