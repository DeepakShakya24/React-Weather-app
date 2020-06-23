import React, { useState, useEffect } from 'react';

import './Person.css';
import Form from './Form';

const Person = (props) => {
    const[name,setCity]=useState('');
    const [feels_like, setFeelsLike] = useState('');
    const [mainTemp, setMainTemp] = useState('');
    const [description, setDescription] = useState('');
    const [main, setMain] = useState('');
    const [iconID, setIconID] = useState('');
    useEffect(() => {
        document.title = 'Weather App'
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=590d1d148a8ebee34d9415b944e7a274")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCity(data.name)
                setFeelsLike(data.main.feels_like);
                setMainTemp(data.main.temp);
                setDescription(data.weather[0].description);
                setMain(data.weather[0].main);
                setIconID(data.weather[0].icon);
            })
    }, [])

    return ( 
        <div>
            <Form  />
            <h1>{name}</h1>
            <h1> { mainTemp } </h1> 
            <h1> { feels_like } </h1> 
            <h1> { main } </h1> 
            <h1> { description } </h1>
            <img src = { 'http://openweathermap.org/img/wn/' + iconID + '@2x.png' }alt = 'img' />
        </div>
    )

};

export default Person;