import React, { useEffect, useState } from 'react'
import './App.css';
import snowIcon from './assets/snow.png'
import clearIcon from './assets/clear.png'
import drizzleIcon from './assets/drizzle.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import searchIcon from './assets/search.png'
import cloudIcon from './assets/clouds.png'
import humidityIcon from './assets/humidity.png'
const WeatherDetails = ({icon, temp, city, country, latitude, longitude, wind, humidity}) =>{
    return (
        <>
        <div className='image'>
            <img src={icon} alt="" />
        </div>
        <div className="temp">
        {temp}°C
        </div>
        <div className="city">
            {city}
        </div>
        <div className="country">
            {country}
        </div>
        <div className="cord">
        <div className="lattitude">
            <span className='lat'>Latitude</span>
            <span> {latitude}</span>
        </div>
        <div className="longitude">
           <span className="log">Longitute</span>
           <span> {longitude}</span>
        </div>
        </div>
        
        <div className="data-container">
        <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
        
        <div className="data">
            <div className="humidity-percent">
            {humidity} %
            </div>
            <div className="text">Humdity</div>
        </div>
        </div>
        <div className="element">
            <img src={windIcon} alt="" className="icon" />
        <div className="data">
            <div className="humidity-percent">
            {wind} km/hr
            </div>
            <div className="text">Speed</div>
        </div>
        </div>
        </div>
        
        </>
    )
}

export const Weather = () => {
    let api_key = "5f0fead3cf774edde3616031da275ced"
    const[text, setText] = useState("Chennai")
    const[error, setError] = useState(null)
    const [image, setImage] = useState(clearIcon);
    const[temp, setTemp] = useState(0);
    const[city, setCity] = useState("Coimbatore")
    const[country, setCountry] = useState("IN")
    const[latitude, setLatitude] = useState(0)
    const[longitude, setLongitude] = useState(0)
    const[wind,setWind] = useState(0);
    const[humidity, setHumidity] = useState(0);
    const[loading, setLoading]  = useState(false);
    const[citNotFound, setCityNotFound] = useState(false);
    const WeatherIconMap = {
        "01d":clearIcon,
        "01n":clearIcon,
        "02d":clearIcon,
        "02n":clearIcon,
        "03d":drizzleIcon,
        "03n":drizzleIcon,
        "04d":drizzleIcon,
        "04n":drizzleIcon,
        "09d":rainIcon,
        "09n":rainIcon,
        "10d":rainIcon,
        "10n":rainIcon,
        "13d":snowIcon,
        "13n":snowIcon,
    }
    
    const search = async()=>{  
        setLoading(true);  
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
        try {
            let res = await fetch(url)
            let data = await res.json();
            console.log(data);
            if(data.cod === "404"){
                console.log("Not found");
                setCityNotFound(true);
                setLoading(false);
                return;
               }
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setLatitude(data.coord.lat)
            setLongitude(data.coord.lon)
            const weatherIconCode = data.weather[0].icon;
            setImage(WeatherIconMap[weatherIconCode] || clearIcon)
            setCityNotFound(false);
        } catch (error) {
           console.error("Error occured: "+error)
            setError("Error while fetching data")
            setCityNotFound(true)
        }
        finally{
            setLoading(false)
        }
    }
    const handleState = (e) =>{
        setText(e.target.value);
        
    }
    const handleKeyDown = (e) =>{
        if(e.key ==="Enter"){
            search();

        }
    
    }
    useEffect(function (){
        search(); 
    },[])
  return (
    <div className='container'>
            <div className='input-container'>
                <input type="text"
                 className='search-bar' 
                placeholder='Enter city to search' 
                onChange={handleState}
                onKeyDown={handleKeyDown}
                value={text}
                />
                <div className="search" onClick={()=>search()}>
                    <img className='search-icon' src={searchIcon} alt="" />
                </div>
            </div>
            {!loading && !citNotFound&& <WeatherDetails icon = {image} temp = {temp} city={city} country={country} latitude={latitude} 
            longitude={longitude} wind={wind} humidity={humidity}/>}
           { loading&&<div className="loading-message">
                <p>Loading....</p>
            </div>}
            <div className="error-message">
                <p>{error}</p> 
            </div>
           {citNotFound&& <div className="notfound-message">Data Not Found</div>
            }
            <div className="copyright">
                Designed By <span>Sivaraj</span>
            </div>
    </div>
  )
}
