import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"


import {SERVER_HOST} from "../config/global_constants"


export default class FilterModal extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {mounted: false,
                    category: this.props.category,
                    brand: '',
                    size: 0,
                    price: 0,
                    apply : false  }
    }

    render(){
        return(
            <div id="filterContainer">
                <Link  to={ { pathname: '/DisplayAllSkates', state: { id: this.state.category, brand: this.state.brand, size: this.state.size, price: this.state.price, apply: this.state.apply} }}></Link>
            </div>
        )
    }
}