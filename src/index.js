import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import HomePage from './homePage/homepage'
import { CookiesProvider } from "react-cookie";
import './index.css';

ReactDOM.render(
        <CookiesProvider>

                <BrowserRouter>
                
                        <Route exact path="/" component={HomePage} />
                        <Route path="/application" component={App} />

                </BrowserRouter>,
                
        </CookiesProvider>,
                         
    
document.getElementById('root'));