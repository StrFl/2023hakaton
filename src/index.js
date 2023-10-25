import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from './components/App/App';
import Auth from './components/auth/Auth';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <BrowserRouter>
            

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/app" element={<App />} />
                <Route path="/auth" element={<Auth />} />
               </Routes>
         
        </BrowserRouter>
  </React.StrictMode>
);




reportWebVitals();
