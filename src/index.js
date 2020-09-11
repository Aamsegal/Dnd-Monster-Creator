import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import HomePage from './homePage/homepage'
import './index.css';

ReactDOM.render(

        <BrowserRouter>
                
                <Route exact path="/" component={HomePage} />
                <Route path="/application" component={App} />

        </BrowserRouter>, 
    
document.getElementById('root'));