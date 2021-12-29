import React, {Component} from "react"
import axios from "axios"

import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

export default class SkateHolder extends Component //Cosas sin cambiar del copypaste
{

    constructor(props) 
    {
        super(props)
        
        this.state = {  //Ver como qedan los campos
            id: this.props.skate._id,
            image: null,
            size: 0,
            brand: '',
            price: 0
            
        }
    }

    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/DisplayAllSkates/${this.props.skate._id}`)
        .then(res => {
            if(res.data)
            {            
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    this.setState({image: res.data.photo})
                    this.setState({size: res.data.size})
                    this.setState({brand: res.data.brand})
                    this.setState({price: res.data.price})                                                       
                }   
            }
            else
            {
                console.log("Record not found")
            }
            this.state.image.map(photo => //checkear el campo
            {
                return axios.get(`${SERVER_HOST}/DisplayAllSkates/photo/${photo.filename}`)
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
            })
        }) 
    }
    
    
    render() 
    {
        return (
            <tr>
                <td>{this.state.brand}</td>
                <td>{this.state.size}</td>
                <td>{this.state.price}</td>
                <td className="productPhotos">
                    {this.state.image.map(photo => <img key={photo.filename} id={photo.filename} alt=""/>)}
                </td>           
                <td>
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/modForm/" + this.props.match.params.id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/deleteForm/" + this.props.match.params.id}>Delete</Link> : null}   
                </td>  
                
            </tr>
        )
    }
}