import React, {Component} from "react"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class CartTableRow extends Component 
{     
    constructor(props) 
    {
        super(props)

        this.state = {
            product:  [],
            mounted: false
        }

    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/DisplayAllSkates/get/${this.props.product}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
                {
                    this.setState({product: res.data}) 
                    this.setState({mounted: true})
                }
                else
                {
                    console.log("Records not found")
                }
        })
    }

    render() 
    {
        let productInfo = ''

        if(this.state.type === 'Wheels'){
            productInfo = `${this.state.product.brand} ${this.state.product.size}mm ${this.state.product.type}`
        }else{
            productInfo = `${this.state.product.brand} ${this.state.product.size}" ${this.state.product.type}`
        }
        return (
            <tr>
                <td>{productInfo}</td>
                <td>{this.state.product.price}€</td>    
                <td>Fotos</td>
            </tr>
        )
    }
}