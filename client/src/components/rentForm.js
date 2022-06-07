import React, {Component} from "react"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"
import NavBar from "./NavBarResidents"

import {SERVER_HOST} from "../config/global_constants"
import MonthYearPicker from 'react-month-year-picker';


export default class rentForm extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {
            property: null,
            month: null,
            year: null,
            expireMonth: null,
            expireYear: null,
            expireMonth: null,
            resident: localStorage.email,
            residents: null,
            redirect:false,
            errorMessage: '',
            mounted: false
        }
    }

    componentDidMount()
    {

        let now = new Date();
        let current
        if (now.getMonth() == 11) {
            current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }

        this.setState({month: current.getMonth() + 1, year: current.getFullYear()})

        axios({
            method: "get",
            url: `${SERVER_HOST}/Properties/${this.props.match.params.id}/`,
            headers: { "authorization": localStorage.token },
        }).then(res => {
            //handle success
            if(res.data)
            {            
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    this.setState({property: res.data})
                    this.setState({mounted: true})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }).catch(err => {
            //handle error
            console.log(err)
        })
    }


    validateDate() {
        if( this.state.month != 'no'){
            if(this.state.year != 'no'){
                var d = new Date(this.state.year, this.state.month-1, 1)
                if(d > Date.now())
                    return true
            }
        }
        return false
    }

    validateExpireDate() {
        if( this.state.expireMonth != 'no'){
            if(this.state.expireYear != 'no'){
                var ed = new Date(this.state.expireYear, this.state.expireMonth-1, 28)
                var d = new Date(this.state.year, this.state.month-1, 1)
                if(ed > d)
                    return true
            }
        }
        return false
    }

    validateResidents() {
        if(this.state.residents != '')
            return true
        
        return false
    }

    validation(){
        return {
            date: this.validateDate(),
            expireDate: this.validateExpireDate(),
            residents: this.validateResidents()
        }

    }


    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})

    }

    sendRequest = e => {
        let finalResidents = []
        let splittedData
        this.state.residents.split(';').map((nameId, index) =>{
            splittedData = nameId.split(',')

            finalResidents[index] = {
                name: splittedData[0],
                id: splittedData[1]
            }
        })



        let formData = new FormData()  
        formData.append("date", new Date(this.state.year, this.state.month-1, 1))
        formData.append("expireDate", new Date(this.state.expireYear, this.state.expireMonth-1, 28))
        formData.append("moneyAmount", this.state.property.price) 
        formData.append("tenant", this.state.property.tenant) 
        formData.append("monthlyDeadLine", 1)
        formData.append("resident", this.state.resident)

        //for residents
        for(let i = 0; i < finalResidents.length; i++)
        {
            formData.append("residents", JSON.stringify(finalResidents[i]))
        }

        axios.post(`${SERVER_HOST}/Properties/rentProperty/${this.props.match.params.id}`, formData, {headers:{"authorization":localStorage.token ,"Content-type": "multipart/form-data"}})
        .then(res => 
        {   
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {   
                    console.log("Record added")
                    this.setState({redirect: !this.state.redirect})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        }).catch(err =>{
            console.log("err:" + err.response.data) 
        })
    }

    cancelProperty = e => {
        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   
        //errors
        let validDate = <div className="error"> Enter a valid date.</div>
        let validExpireDate = <div className="error"> Enter a valid date.</div>
        let validResidents = <div className="error"> Enter the name of the residents. name,id;name,id...</div>

        //validation
        const formInputsState = this.validation()
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]) 

        return (       
            <div className="web-container"> 
                {this.state.redirect ? <Redirect to="/residentHome"/> : null}
                <NavBar selected="0"/>
                {this.state.mounted ? 
                <div className="content-container">
                    <div className="rent-form">
                        <h1>Rent Form</h1>
                        <div className="fields-container">
                            <div className="dates-container">
                                <div className="date-item">
                                    <MonthYearPicker
                                        caption="Select a starting year and month."
                                        selectedMonth={this.state.month}
                                        selectedYear={this.state.year}
                                        minYear={new Date().getFullYear()}
                                        maxYear={2030}
                                        onChangeYear={year => this.setState({ year: year })}
                                        onChangeMonth={month => this.setState({ month: month })}
                                        />
                                    {formInputsState.date ? "" : validDate}
                                </div>
                                <div className="date-item">
                                    <MonthYearPicker
                                        caption="Select an ending year and month."
                                        selectedMonth={this.state.month}
                                        selectedYear={this.state.year}
                                        minYear={new Date().getFullYear()}
                                        maxYear={2030}
                                        onChangeYear={year => this.setState({ year: year })}
                                        onChangeMonth={month => this.setState({ month: month })}
                                        />
                                    {formInputsState.expireDate ? "" : validExpireDate}
                                </div>
                            </div>
                            <div className="residents-container">
                                {/* formed by a add resident "form" and a table of residents*/}
                                <input className = {"form-control"}
                                    id="residents" 
                                    type="text" 
                                    name="residents" placeholder="Property Residents" 
                                    onChange={this.handleChange} ref={input => { this.inputToFocus = input }}/>
                                {formInputsState.residents ? "" : validResidents}
                            </div>
                        </div>
                        <div className="button-container">
                            <input type="button" className="green-button" value="Submit" disabled = {!inputsAreAllValid} onClick={this.sendRequest}/>
                            <Link className="red-button" to="/residentContracts"> Cancel Rental</Link>
                        </div> 
                    </div>             
            </div> : null}
                
            </div>
        )
    }
}