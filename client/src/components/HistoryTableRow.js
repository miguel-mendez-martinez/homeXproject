import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class HisotryTableRow extends Component 
{    
    /* componentDidMount() 
    {
        this.props.transactions.photos.map(photo => 
        {
            return axios.get(`${SERVER_HOST}/cars/photo/${photo.filename}`)
            .then(res => 
            {         
                document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
            })
            .catch(err =>
            {
                // do nothing
            })
        })
    } */
    
    
    render() 
    {
        return (
            <tr>
                <td>{this.props.transaction._id}</td>
                <td>{this.props.transaction.name}</td>
                <td>{this.props.transaction.date}</td>
                <td>{this.props.transaction.price}</td>{/* 
                <td className="carPhotos">
                    {this.props.car.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                </td>   */}      
            </tr>
        )
    }
}