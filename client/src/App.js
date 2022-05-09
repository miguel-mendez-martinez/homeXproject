import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import HomeTenant from "./components/homeTenant"
import userCreationForm from "./components/userCreationForm"
import logInForm from "./components/logInForm"



export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={logInForm} />
                    <Route exact path="/registerUser" component={userCreationForm} />
                    <Route exact path="/logInForm" component={logInForm}/>
                    <Route exact path="/tenantHome" component={HomeTenant}/>
                    <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/>                           
                </Switch>
            </BrowserRouter>
        )
    }
}