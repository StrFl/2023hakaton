import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import App from './components//App/App';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <BrowserRouter>
            

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/app" element={<App />} />
               </Routes>
         
        </BrowserRouter>
  </React.StrictMode>
);




reportWebVitals();
