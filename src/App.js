import React from 'react';
import './App.css';
import Form from './Person/Form'
import { useEffect } from 'react';

const App=()=>{
  useEffect(()=>{
    document.title='Weather App'
  })
  return(
    <div>
    <Form />
    </div>
  )
}

  export default App