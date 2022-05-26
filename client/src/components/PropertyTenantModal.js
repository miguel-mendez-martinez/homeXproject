import React, {Component} from "react"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"

import {SERVER_HOST} from "../config/global_constants"


export default class PropertyTenantModal extends Component{ //Not possible to update images yet

    constructor(props) 
    {
        super(props)

        this.state = {property: this.props.property,
                      id: this.props.property._id,
                      pictures: [],
                      selectedFiles: null,
                      mounted: false,
                      redirect: false }
    }

    componentDidMount() 
    {   
        let images = []
        this.state.property.images.map(fileName => {
            axios.get(`${SERVER_HOST}/Properties/images/${fileName}`)
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
                        images.push(res.data.image)      
                    }   
                }
                else
                {
                    console.log("Record not found")
                }
            })
            this.setState({pictures: images})
            this.setState({mounted: true})
        })
    }

    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})

    }

    updateProperty = () => {
        const property = {area: this.state.property.area, price: this.state.property.price, residents: this.state.property.residents, images: this.state.property.images } 
        axios.put(`${SERVER_HOST}/Properties/${this.state.id}`, property, {headers:{"authorization":localStorage.token}})
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
                    this.setState({redirect: true})
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
    

    deleteProperty = () => {
        axios.delete(`${SERVER_HOST}/Properties/${this.state.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {          
                this.setState({redirect: true})
                console.log("Record deleted")
            }else{
                console.log("Record not deleted")
            }
        }).catch(error =>{
            console.log("err:" + error.response.data)
        })   
    }

    anyResident = () => {
        if(this.state.property.residents.lenght === 0)
            return false
        else
            return true
    }


    render(){ 
        let residentsString = ''
        this.state.property.residents.map(res => residentsString += res + '\n')       

        return(
            <div id="modal"> 
            {this.state.redirect ? <Redirect to="/tenantHome"/> : null}
                <div id="modalContent">
                    <div className="modal-body">
                        <div id="info">
                            <div id="title">
                                <h1>{this.state.property.address}</h1>
                            </div>
                            <div id="exit" onClick={this.props.closeModal}>
                                <img src= {require("../images/exit.png")} alt="/"/>
                            </div>
                        </div>
                        <div id="propertyImages">
                            {this.state.mounted ? this.state.pictures.map(picture => <img key={picture} src={`data:;base64,${picture}`} alt=""/>) : null}
                        </div>
                        <div id="propertyFieldsMod">
                            <label>Area:<input type="text" name="size" onChange={this.handleChange} value={this.state.property.area}/></label><br/>
                            <label>Price:<input type="text" name="size" onChange={this.handleChange} value={this.state.property.price}/></label><br/>
                            <label>Residents:<input type="text" name="size" onChange={this.handleChange} value={residentsString}/></label><br/>
                       </div>
                        <div id="buttons">
                            <input type="file" multiple onChange={this.handleFileChange}/>
                            <input type="button" className="green-button" value="Update" onClick={this.updateProperty}/>
                            <input type="button" className="red-button" value="Delete" disabled={this.anyResident} onClick={this.deleteProperty}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}