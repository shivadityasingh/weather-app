import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Weather(){

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if(!city) return;

            setError(null);
            setLoading(true);
            setWeather(null);
            try{
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=85cb95fbcede46cfa83214356241807&q=${city}`);
                setWeather(response.data);
            }
            catch(err){
                setError(err);
            }
            setLoading(false);
        };

        fetchWeather();
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div>
            <h1>Weather-App</h1>
            <input className='input' type = 'text' value={city} onChange={handleCityChange} placeholder='Enter City Name'/>
            {loading && <p>Loading..</p>}
            {error && <p>Error Fetching Data</p>}
            {weather && (
            <div>
                <h2>{weather.location.name}</h2>
                <h3>{weather.current.condition.text}</h3>
                <h3>{weather.current.temp_c}°C</h3>
            </div>
        )}
        </div>
    );

}

export default Weather;