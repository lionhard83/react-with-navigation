import React, {createContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from './components/Button';
import { Episodes } from './components/Episodes/Episodes';
import { SingleEpisode } from './components/SingleEpisode';
import { CommonContext } from './context/CommonContext';



function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSize, setFontSize] = useState(10);
  
  return (
      <CommonContext theme={theme} fontSize={fontSize} >
        <BrowserRouter>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
            <br></br>
            <button onClick={() => setFontSize(fontSize + 1)}>+</button>
            <button onClick={() => setFontSize(fontSize - 1)}>-</button>
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
        </CommonContext>
  );
}

export default App;
