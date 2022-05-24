import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import HomeTenant from "./components/homeTenant"
import HomeResident from "./components/homeResident"
import userCreationForm from "./components/userCreationForm"
import logInForm from "./components/logInForm"
import LogOut from "./components/logOut"
import LoggedInRoute from "./components/LoggedInRoute"
import LoggedInRouteTen from "./components/LoggedInRouteTen"
import ContractTenant from "./components/contractsTenant"
import BillsTenant from "./components/billsTenant"
import ScheduleTenant from "./components/scheduleTenant"
import ProfileTenant from "./components/profileTenant"
import ContractsResident from "./components/contractsResident"
import BillsResident from "./components/billsResident"
import ProfileResident from "./components/profileResident"
import addPropForm from "./components/addPropForm"
import rentForm from "./components/rentForm"
import axios from "axios"
import { SERVER_HOST } from "./config/global_constants"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined" || !localStorage.token || localStorage.accessLevel == ACCESS_LEVEL_GUEST)
{
    localStorage.clear()
    localStorage.email = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    //localStorage.token = null 
}else{
    axios({
        method: "get",
        url: `${SERVER_HOST}/Users/checkLogIn`,
        headers: { "authorization": localStorage.token },
    }).then(res => {
        //handle success
        localStorage.email = res.data.email
        localStorage.accessLevel = res.data.accessLevel
        localStorage.token = res.data.token

    }).catch(err => {
        //handle error
        localStorage.clear()
        localStorage.email = "GUEST"
        localStorage.accessLevel = ACCESS_LEVEL_GUEST
    });
}

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={logInForm} />
                    <LoggedInRoute exact path="/logOut" component={LogOut} />
                    <Route exact path="/registerUser" component={userCreationForm} />
                    <Route exact path="/logInForm" component={logInForm}/>
                    <LoggedInRouteTen exact path="/tenantHome" component={HomeTenant}/>
                    <LoggedInRouteTen exact path="/tenantContracts" component={ContractTenant}/>
                    <LoggedInRouteTen exact path="/tenantBills" component={BillsTenant}/>
                    <LoggedInRouteTen exact path="/tenantSchedule" component={ScheduleTenant}/>
                    <LoggedInRouteTen exact path="/tenantProfile" component={ProfileTenant}/>
                    <LoggedInRoute exact path="/residentHome" component={HomeResident}/>
                    <LoggedInRoute exact path="/residentContracts" component={ContractsResident}/>
                    <LoggedInRoute exact path="/residentBills" component={BillsResident}/>
                    <LoggedInRoute exact path="/residentProfile" component={ProfileResident}/>
                    <LoggedInRoute exact path="/tenantAddPropForm" component={addPropForm}/>
                    <LoggedInRoute exact path="/rentForm/:id" component={rentForm}/>
                    <Route path="*" component={() => <h3>Invalid URL. Webpage does not exist</h3>}/>                           
                </Switch>
            </BrowserRouter>
        )
    }
}