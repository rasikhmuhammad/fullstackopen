import "./index.css"
import useWeather from "../../services/weather.js"
import {useEffect, useState} from "react"

const SingleCountry = ({country}) => {

    const [weather, setWeather] = useState(null)

    useEffect( () => {
        useWeather.getByCity(country.capital)
            .then(weatherData => {
                setWeather(weatherData)
            })
            .catch(error => {
                alert(error)
            })
    }, [])

    if(!weather) {
        return null
    }

    const languages = []
    for(let x in country.languages) {
        languages.push(country.languages[x]) 
    }

    return (
        <div className = "view-country">
            <h2>{country.name.common}</h2>
            <p>Capital - {country.capital}</p>
            <p>Area - {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {languages.map( (language) => {
                    return (
                        <li key = {language}>
                            {language}
                        </li>
                    )
                })} 
            </ul>
            <img src = {country.flags.png}></img>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature - {weather.main.temp} Celcius </p>
            <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>Wind - {weather.wind.speed} m/s </p>

        </div>
    )
}

const MultipleCountry = ({visibleCountries, onClick}) => {
    return (
        <ul>
            {visibleCountries.map( (country) => {
                return (
                    <li key = {country.name.common}>
                        {country.name.common}
                        <button 
                            onClick = { () => {
                                onClick(country.name.common)
                            }}>
                            show
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

const Countries = ({visibleCountries, onClick}) => {
    let singleCountry = false

    if(visibleCountries.length === 1) singleCountry = true

    if(singleCountry) {
        return (
            <SingleCountry country = {visibleCountries[0]} />
        )
    }
    else {
        return (
            <MultipleCountry visibleCountries = {visibleCountries} onClick = {onClick} />
        )
    }
}

export default Countries