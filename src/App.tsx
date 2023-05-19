import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from './components/Button';
import { Episodes } from './components/Episodes';
import { SingleEpisode } from './components/SingleEpisode';

function App() {

  return (
    <BrowserRouter>
        <Link to='/episodes/2'>episodes/2</Link><br></br>
        <Link to='/episodes'>episodes</Link><br></br>
        <Button />
        <Routes>
            <Route path='episodes'>
                <Route index element={<Episodes />}></Route>
                <Route path=':id' element={<SingleEpisode />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
