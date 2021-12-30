import React, {Component} from "react"
import axios from "axios"

import {Link} from "react-router-dom"

import {SERVER_HOST} from "../config/global_constants"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

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
            price: this.props.skate.price
            
        }
    }

    componentDidMount() 
    {
        /*this.props.skate.photo.forEach(photo => {
            axios.get(`${SERVER_HOST}/DisplayAllSkates/photo/${photo.filename}`)
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
                        document.getElementById(photo.filename).src = `data:;base64,${res.data.image}`                                                         
                    }   
                }
                else
                {
                    console.log("Record not found")
                }
            })
        }) */
    }
    
    
    render() 
    {
        return (
            <tr>
                <td>{this.state.brand}</td>
                <td>{this.state.size}</td>
                <td>{this.state.price}</td>
                {/* <td className="productPhotos"> */}
                <td>
                    {/* this.props.skate.photo.forEach(photo => <img key={photo.filename} id={photo.filename} alt=""/>) */ }
                </td>           
                <td>
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/modForm/" + this.state.id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/deleteForm/" + this.state.id}>Delete</Link> : null}   
                </td>  
                
            </tr>
        )
    }
}