import React, {Component} from "react"

import axios from "axios"

import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

import WebHeader from "./WebHeader"
import SkateHolder from "./SkateHolder"


export default class SkateDisplay extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[],//Aqui se cargarian las ids de los productos
            mounted: false,
            redirectAddForm: false
        }

        /* if (window.performance) {
            if (performance.navigation.type === 1) {
                console.log("this page is reloaded")
                if(typeof this.props.location.state != 'undefined'){
                    this.props.location.state.id = ""
                }
                //when its reloaded, we check user privileges and change them to what should be
                //this is made in order to bane users from changing the web by changing their level of access
                if(localStorage.accessLevel >= ACCESS_LEVEL_GUEST + 5){ //el + 5 para q no entre pq resetea el accesLevel a 0 
                    console.log("validating user")

                    axios.defaults.headers.common['Authorization'] = localStorage.token;

                    axios.post(`${SERVER_HOST}/Users/validateUser`, { headers: { 'Authorization': `${localStorage.token}` } })
                    .then(res => 
                    {
                    if(res.data)
                        {
                            console.log(res.data)
                            localStorage.accessLevel = res.data.accessLevel
                            console.log("Token and user verified and correctly set.")              
                        }
                    else
                        {
                            console.log("Error, token didnt reach.")
                        }
                    })  
                }
            }else {
                console.log("This page is not reloaded");
            }
                   
            }*/
    }


    componentDidMount() 
    { 

        if(typeof this.props.location.state != 'undefined'){

            //aqui se hace un get con categoria=lo que viene del redirect

            //un get normal y corriente
            axios.get(`${SERVER_HOST}/DisplayAllSkates/${this.props.location.state.id}`)
            .then(res => 
            {
                if(res.data)
                    {
                        this.setState({products: res.data}) 
                        this.setState({mounted: true})       
                        console.log(res.data)             
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
                        console.log(res.data)                  
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
                        <h1>Products Here</h1>
                        {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? <Link className="blue-button" to="/addForm"> Add Product </Link> : null}
                        {/* this.state.products.forEach((index) =>{ //Lo de _id peta no se p q
                            <skateHolder key={this.state.products[index]._id} skate={this.state.products[index]}/>
                        }) */}
                        {/*<SkateHolder skate={this.state.products[0]}/>*/}
                    </div>     
                </div>
                
            </div> 

        )
    }
}