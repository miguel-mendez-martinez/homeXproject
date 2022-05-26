import React, {Component} from "react"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"

import {SERVER_HOST} from "../config/global_constants"


export default class PropertyResidentModal extends Component{ 

    constructor(props) 
    {
        super(props)

        this.state = {property: this.props.property,
                      id: this.props.property._id,
                      pictures: [],
                      mounted: false}
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


    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})

    }

    rentProperty = () => {
        
    }


    render(){ 
        return(
            <div id="modal"> 
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
                        <div id="propertyFields">
                            <label>Area: {this.state.property.area}</label><br/>
                            <label>Price: {this.state.property.price}</label><br/>
                       </div>
                        <div id="buttons">
                            <Link id="rentButton" className="green-button" to="/rentForm"> Rent </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}