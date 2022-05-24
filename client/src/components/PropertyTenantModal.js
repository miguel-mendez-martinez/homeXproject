import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

import {SERVER_HOST} from "../config/global_constants"


export default class SkateModal extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {property: this.props.property,
                      id: this.props.property._id,
                      pictures: '',
                      mounted: false }
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
                        images.append(res.data.image)      
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

    updateProperty = () => {
        
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
                        {/* <div id="propertyImages">
                            {this.state.mounted ? this.state.pictures.map((picture) => {<img id={picture} src={`data:;base64,${picture}`} alt=""/>}) : null}
                        </div> */}
                        <div id="buttons">
                            <input type="button" className="green-button" value="Update" disabled = {!inputsAreAllValid} onClick={this.updateProperty}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}