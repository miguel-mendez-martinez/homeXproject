import React, {Component} from "react"
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import SkatesDisplay from "./components/SkatesDisplay"
import Home from "./components/Home"
import About from "./components/About"
import userForm from "./components/userForm.js"
import logOut from "./components/logOut.js"
import logInForm from "./components/logInForm"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"

if (typeof sessionStorage.accessLevel === "undefined")
    {
        sessionStorage.name = "GUEST"
        sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
    }

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <header>
                    <Link to="/home">Home </Link>
                    <Link to="/about">About </Link>
                    <Link to="/DisplayAllSkates">Products</Link>
                </header>
                <Switch>                 
                    <Route exact path="/" component={SkatesDisplay} />
                    <Route exact path="/DisplayAllSkates" component={SkatesDisplay}/> 
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/userForm" component={userForm}/>
                    <Route exact path="/logInForm" component={logInForm}/>
                    <Route exact path="/logOut" component={logOut}/>
                    <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/> {/* si es mala la url sale esto */}                           
                </Switch>
            </BrowserRouter>
        )
    }
}