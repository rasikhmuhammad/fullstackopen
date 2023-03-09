import axios from "axios"

const baseUrl = "https://api.openweathermap.org"

const apiKey = process.env.REACT_APP_API_KEY

const getByCity = (cityName) => {
    const request = axios.get(`${baseUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    return request.then(response => response.data)
}

export default { getByCity }