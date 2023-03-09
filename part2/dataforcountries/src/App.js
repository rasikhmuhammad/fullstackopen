import SearchFilter from "./components/SearchFilter";
import Countries from "./components/Countries";
import "./App.css"
import {useState, useEffect} from "react"
import useCountries from "./services/countries";


function App() {

  const [countries, setCountries] = useState(null)
  const [visibleCountries,setVisibleCountries] = useState(null)
  const [searchName, setSearchName] = useState('')
  const [error, setError] = useState('')

  useEffect( () => {
    useCountries.getAll()
      .then(initialCountries => {
        setCountries([...initialCountries])
      })
  }, [])

  const searchForCountry = (countryName) => {
    setVisibleCountries(null)

    const countryList = countries.filter( (country) => {
      
      if(country.name.common.toString().toLowerCase() === countryName) {
        return true
      }
      else if(country.name.common.toString().toLowerCase().includes(countryName)) {
        return true
      }
      else return false
    })

    console.log(countryList)

    if(countryList.length > 10) {
        setError('too many results, please narrow search')
        setVisibleCountries(null)
    }
    else if(countryList.length >= 1) {
        setError('')
        setVisibleCountries([...countryList])
    }
    else if(countryList.length < 1) {
      setError('No results')
      setVisibleCountries(null)
    }
  }
  

  // const searchForCountry = (name) => {
  //   useCountries.search(name)
  //     .then(countries => {
  //       if(countries.length > 10) {
  //         setError('too many results, please narrow search')
  //         setVisibleCountries(null)
  //       }
  //       else {
  //         setError('')
  //         setVisibleCountries([...countries])
  //       }
  //     })
  //     .catch(() => {
  //       setError('no results')
  //     })
  // }

  const handleNameChange = (event) => {
    setError("")
    setSearchName(event.target.value)
    if(event.target.value !== "") {
      searchForCountry(event.target.value.toString().toLowerCase())
    }
  }

  const onClick = (name) => {
    setVisibleCountries(visibleCountries.filter( country => country.name.common === name))
  }

  if(!countries) {
    return null
  }

  return (
    <div className="App">
        <SearchFilter handleNameChange={handleNameChange} />
        {error !== '' && <p>{error}</p>}
        { 
          visibleCountries && 
          searchName !== '' && 
          <Countries 
            visibleCountries = {visibleCountries} 
            onClick = {onClick} 
          /> 
        }
    </div>
  );
}

export default App;
