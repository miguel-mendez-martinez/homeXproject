import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import SkatesDisplay from "./components/SkatesDisplay"
import About from "./components/About"
import userForm from "./components/userForm.js"
import logOut from "./components/logOut.js"
import logInForm from "./components/logInForm.js"
import addForm from "./components/addForm.js"
import resetDB from "./components/resetDB.js"
import LoggedInRoute from "./components/LoggedInRoute"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import Categories from "./components/Categories"

if (typeof localStorage.accessLevel === "undefined")
    {
        localStorage.name = "GUEST"
        localStorage.accessLevel = ACCESS_LEVEL_GUEST
        localStorage.token = null
    }

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={SkatesDisplay} />
                    <Route exact path="/DisplayAllSkates" component={SkatesDisplay}/> 
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/userForm" component={userForm}/>
                    <Route exact path="/logInForm" component={logInForm}/>
                    <LoggedInRoute exact path="/logOut" component={logOut}/>
                    <LoggedInRoute exact path="/addForm" component={addForm}/>
                    <Route exact path="/resetDB" component={resetDB}/>
                    <Route exact path="/categories" component={Categories}/>
                    <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/> {/* si es mala la url sale esto */}                           
                </Switch>
            </BrowserRouter>
        )
    }
}