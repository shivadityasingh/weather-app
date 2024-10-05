import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'

const initialState = {
    weather : null,
    loading : false,
    city : '',
    error : null
};

const reducer = (state, action) =>
{
    switch(action.type)
    {
        case 'Weather' : return {...state, weather : action.payload};
        case 'Loading' : return {...state, loading : action.payload};
        case 'City' : return {...state, city : action.payload};
        case 'Error' : return {...state, error : action.payload};
        default : return state;
    }
}

function Weather(){

    // const [weather, setWeather] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [city, setCity] = useState('');
    // const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(reducer, initialState);



    useEffect(() => {
        const fetchWeather = async () => {

            if(!state.city) return;            
            // setError(null);
            // setLoading(true);
            // setWeather(null);

            dispatch({type : 'Error', payload : null});
            dispatch({type : 'Loading', payload : true});
            dispatch({type : 'Weather', payload : null});

            try{
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=85cb95fbcede46cfa83214356241807&q=${state.city}`);
                //setWeather(response.data);
                dispatch({type : 'Weather', payload : response.data});
            }
            catch(err){
                //setError(err);
                dispatch({type : 'Error', payload : err});

            }
            //setLoading(false);
            dispatch({type : 'Loading', payload : false});

        };

        fetchWeather();
    }, [state.city]);

    const handleCityChange = (e) => {
        //setCity(e.target.value);
        dispatch({type : 'City', payload : e.target.value});

    };

    return (
        <div>
            <h1>Weather-App</h1>
            <input className='input' type = 'text' value={state.city} onChange={handleCityChange} placeholder='Enter City Name'/>
            {state.loading && <p>Loading..</p>}
            {state.error && !state.weather && <p>Error Fetching Data</p>}
            {state.weather && (
            <div>
                <h2>City : {state.weather.location.name}</h2>
                <h3>Condition : {state.weather.current.condition.text}</h3>
                <h3>Temperature : {state.weather.current.temp_c}°C</h3>
            </div>
        )}
        </div>
    );

}

export default Weather;