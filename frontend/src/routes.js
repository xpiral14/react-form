import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './Pages/login';

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path = '/' exatct component = {Login}/>
            
        </BrowserRouter>
    )
}