import { useState, useEffect } from 'react'
import axios from 'axios'


const getAll = () => {
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  return request.then(response => response.data)
}

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages || {}).map(
        (language) => <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    <Weather capital={country.capital} />
  </div>)


const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  useEffect(() => {
    if (!capital) return
    axios.get(`https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1`).then(response => { 
      setWeather(response.data)
      console.log(response.data)
    })
  }, [capital, api_key])

  if (!weather) return <div>Loading weather...</div>
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <div>wind {weather.wind.speed} m/s</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    </div>
  )
}


const FindCountries = ({ filter, filterValue, handleFilterChange, selectedCountry, onSelectCountry }) => {
  console.log(filter);
  return (<div>
    <div>
      find countries: <input value={filterValue} onChange={handleFilterChange} />
    </div>
    <div>
      {filter.length > 10 ? (
        'Too many matches, specify another filter'
      ) : filter.length === 1 ? (
        <Country country={filter[0]} />
      ) : selectedCountry ? (
        <div>
          <Country country={selectedCountry} />
        </div>
      ) : (
        filter.map(element => (
          <p key={element.name.common}>{element.name.common}<button onClick={() => onSelectCountry(element)}>show</button></p>
        ))
      )}
    </div>
  </div>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilterValue(value)
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCountries(filtered)
    setSelectedCountry(null)
  }

  useEffect(() => {
    getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        setFilteredCountries(initialCountries)
      })
  }, [])

  return (<FindCountries filter={filteredCountries} filterValue={filterValue} handleFilterChange={handleFilterChange} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />)
}

export default App
