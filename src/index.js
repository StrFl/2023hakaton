import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from './components/App/App';
import Auth from './components/auth/Auth';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main';
import { useNavigate } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

const navigate = useNavigate();

const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      navigate("/auth")
    )
  )} />
);




root.render(
  <React.StrictMode>
     <BrowserRouter>
            

            <Routes>
                <Route path="/" element={<Main />} />
                <PrivateRoute path="/app" element={<App />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
         
        </BrowserRouter>
  </React.StrictMode>
);




reportWebVitals();
