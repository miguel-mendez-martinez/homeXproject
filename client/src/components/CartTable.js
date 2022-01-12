import React, {Component} from "react"

import CartTableRow from "./CartTableRow"

export default class CartTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.products.cart.map(element => <CartTableRow key={element} product={element}/>)} 
                </tbody>
            </table>      
        )
    }
}