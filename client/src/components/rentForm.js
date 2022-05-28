import React, {Component} from "react"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"

import {SERVER_HOST} from "../config/global_constants"


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
        this.inputToFocus.focus()

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
        let resident = new Object()
        this.state.residents.split(';').map(nameId =>{
            splittedData = nameId.split(',')
            resident.name = splitteddata[0]
            resident.id = splittedData[1]
            finalResidents.push(resident)
        })


        let formData = new FormData()  
        formData.append("date", new Date(this.state.year, this.state.month-1, 1))
        formData.append("expireDate", new Date(this.state.expireYear, this.state.expireMonth-1, 28))
        formData.append("moneyAmount", this.state.property.price) 
        formData.append("tenant", this.state.property.tenant) 
        formData.append("monthlyDeadLine", 1)
        formData.append("residents", finalResidents)
        formData.append("resident", this.state.resident)

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
                <div className="content-container">
                    <div className="addProp-form-container">
                        <div className="name-container">
                            <h1>Rent Form</h1>
                        </div>
                        <div className="props-container">
                            <div className="items-container">
                                <div className="items-container">
                                    <div className="item">
                                        <select name="month" className="datefield month"  onChange={this.handleChange}>
                                            <option value="no">Month</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">Mar</option>
                                            <option value="04">Apr</option>
                                            <option value="05">May</option>
                                            <option value="06">Jun</option>
                                            <option value="07">Jul</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>/
                                        <select name="year" className="datefield year" onChange={this.handleChange}>
                                            <option value="no">Year</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>
                                {formInputsState.date ? "" : validDate}
                                </div>
                                <div className="items-container">
                                    <div className="item">
                                        <input className = {"form-control"}
                                            id="residents" 
                                            type="text" 
                                            name="residents" placeholder="Property Residents" 
                                            onChange={this.handleChange}/>
                                            €.
                                    </div>
                                    {formInputsState.residents ? "" : validResidents}
                                </div>
                                <div className="items-container">
                                    <div className="item">
                                        <select name="expireMonth" className="datefield month" onChange={this.handleChange}>
                                            <option value="no">Month</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">Mar</option>
                                            <option value="04">Apr</option>
                                            <option value="05">May</option>
                                            <option value="06">Jun</option>
                                            <option value="07">Jul</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>/
                                        <select name="expireYear" className="datefield year" onChange={this.handleChange}>
                                            <option value="no">Year</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>
                                {formInputsState.expireDate ? "" : validExpireDate}
                                </div>
                            </div>

                        </div>
                        <div className="button-container">
                            <input type="button" className="green-button" value="Submit" disabled = {!inputsAreAllValid} onClick={this.sendRequest}/>
                        </div> 
                    </div>             
                </div>
            </div>
        )
    }
}