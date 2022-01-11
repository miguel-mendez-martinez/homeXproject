import React, {Component} from "react"

import axios from "axios"

import {Link} from "react-router-dom"

import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

import WebHeader from "./WebHeader"
import SkateGrid from "./skateGrid"
import FilterModal from "./FilterModal"



export default class SkateDisplay extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[],//Aqui se cargarian las ids de los productos
            mounted: false,
            filterModal: false,
            redirectAddForm: false
        }
    }


    componentDidMount() 
    { 

        if(typeof this.props.location.apply == true){
            axios.get(`${SERVER_HOST}/DisplayAllSkates/${this.props.location.state.id}/${this.props.location.state.brand}/${this.props.location.state.size}/${this.props.location.state.price}`)
            .then(res => 
            {
                if(res.data)
                    {
                        this.setState({products: res.data}) 
                        this.setState({mounted: true})
                    }
                    else
                    {
                        console.log("Records not found")
                    }
            })
        }
        else if(typeof this.props.location.state != 'undefined'){

            //aqui se hace un get con categoria=lo que viene del redirect

            //un get normal y corriente
            axios.get(`${SERVER_HOST}/DisplayAllSkates/${this.props.location.state.id}`)
            .then(res => 
            {
                if(res.data)
                    {
                        this.setState({products: res.data}) 
                        this.setState({mounted: true})
                    }
                    else
                    {
                        console.log("Records not found")
                    }
            })

        }else{
            //un get normal y corriente
            axios.get(`${SERVER_HOST}/DisplayAllSkates`)
            .then(res => 
            {
                if(res.data)
                    {
                        this.setState({products: res.data}) 
                        this.setState({mounted: true})  
                    }
                    else
                    {
                        console.log("Records not found")
                    }
            }) 
        }      
        
        
    }
   
 
    render() 
    {   
        return (           
            <div className="web-container">
                <WebHeader/>
                <div className="content-container">
                    <div className="grid-container">
                        <h1>Products</h1>
                        {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? 
                            <div className="buttons-container">
                                <Link className="blue-button" to="/addForm"> Add Product </Link>
                                {this.state.filterModal ? <FilterModal 
                                        category = {this.props.location.id}
                                        closeModal = {this.showModal.bind(this)}
                                      /> : null}
                            </div>
                        : null}
                        {this.state.mounted ? <SkateGrid skates={this.state.products}/> : null}
                        
                    </div>     
                </div>
                
            </div> 

        )
    }
}