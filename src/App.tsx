import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Mails from './components/mails/Mails'
import styled from 'styled-components';

function App() {

  return (
    <BrowserRouter >
    <div className="App">
      <h1>Mails</h1>
      <StyledList>
      <Link to="/">
        <li>Home</li>
        </Link>
        <Link to="/mails/">
        <li>Skrzynka</li>
        </Link>
      </StyledList>
      <Routes>
        <Route path="/mails/" element={<Mails/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

const StyledList = styled.li`
list-style-type: none;
display: flex;
align-items: flex-start;
flex-direction: column;
font-size: 22px;
margin-left 5vw;
`

export default App;
