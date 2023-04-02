import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainComponent from './MainComponent';
import { BrowserRouter } from 'react-router-dom';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
       <MainComponent/>
    </BrowserRouter>
 
  );
}

export default App;
