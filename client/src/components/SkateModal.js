import React, {Component} from "react"
import axios from "axios"

import {SERVER_HOST, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"


export default class SkateModal extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {skate: this.props.skate,
                      picture: '',
                      mounted: false  }
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

    render(){
        let productInfo = ''
        if(this.state.type == 'Wheels'){
            productInfo = `${this.state.skate.brand} ${this.state.skate.size}mm ${this.state.skate.type}`
        }else{
            productInfo = `${this.state.skate.brand} ${this.state.skate.size}" ${this.state.skate.type}`
        }
        return(
            <div id="modal"> 
                <div id="modalContent">
                    <div className="modal-body">
                        <div id="info">
                            <div id="title">
                                <h1>{productInfo}</h1>
                            </div>
                            <div id="exit" onClick={this.props.closeModal}>
                                <img src= {require("../images/exit.png")}/>
                            </div>
                        </div>
                        <div id="product">
                            {this.state.mounted ? <img id={this.state.picture} src={`data:;base64,${this.state.picture}`} alt=""/> : null}
                            <h2>Brand: {this.state.skate.brand}</h2>
                            <h2>Size: {this.props.skate.size}</h2>
                            <h2>Price:</h2>
                            <p>{this.props.skate.price}€</p>
                        </div>
                        
                         
                    </div>
                </div>
            </div>
        )
    }

}