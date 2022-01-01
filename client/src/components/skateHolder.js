import React, {Component} from "react"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class SkateHolder extends Component 
{

    constructor(props) 
    {
        super(props)

        
        this.state = {  //Ver como qedan los campos
            id: this.props.skate._id,
            photo: this.props.skate.photo,
            size: this.props.skate.size,
            brand: this.props.skate.brand,
            price: this.props.skate.price,
            type: this.props.skate.type,
            picture: '',
            mounted: false
        }
    }

    componentDidMount() 
    {
        
        axios.get(`${SERVER_HOST}/DisplayAllSkates/photo/${this.props.skate.photos[0].filename}`)
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
                    /* document.getElementById(photo.filename).src = `data:;base64,${res.data.image}`  */         
                    this.setState({picture: res.data.image})
                    this.setState({mounted: true})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }
    
    
    render() 
    {

        let productInfo = `${this.state.brand} ${this.state.size}" ${this.state.type}`
        let productPrice = `${this.state.price}€`
        return (
            <div className="skate">
                <div className="productName">
                    {productInfo}
                </div>
                {/* this.props.skate.photo.forEach(photo => <img key={photo.filename} id={photo.filename} alt=""/>) */}
                <div className="skatePhoto">
                    {this.state.mounted ? <img id={this.state.picture} src={`data:;base64,${this.state.picture}`} alt=""/> : null}
                </div>
                <div className="productPrice">
                    {productPrice}
                </div>
            </div>        
        )
    }
}