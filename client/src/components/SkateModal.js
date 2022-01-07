import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

import {SERVER_HOST, ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"


export default class SkateModal extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {skate: this.props.skate,
                      id: this.props.skate._id,
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
        let productSize = ''

        if(this.state.type === 'Wheels'){
            productInfo = `${this.state.skate.brand} ${this.state.skate.size}mm ${this.state.skate.type}`
            productSize = `${this.state.skate.size}mm`
        }else{
            productInfo = `${this.state.skate.brand} ${this.state.skate.size}" ${this.state.skate.type}`
            productSize = `${this.state.skate.size}"`
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
                                <img src= {require("../images/exit.png")} alt="/"/>
                            </div>
                        </div>
                        <div id="product">
                            <div id="productPicture">
                                {this.state.mounted ? <img id={this.state.picture} src={`data:;base64,${this.state.picture}`} alt=""/> : null}
                            </div>
                            <div id="productInfo">
                                <h2>Brand: {this.state.skate.brand}</h2>
                                <h2>Size: {productSize}</h2>
                                <h2>{this.props.skate.price}€</h2>
                            </div>
                        </div>
                        {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? 
                        <div id="buttons">
                            <Link className="blue-button" to={{pathname: `modForm/${this.state.id}`}}> Modify </Link>
                            <Link className="red-button" to={{pathname: `deleteForm/${this.state.id}`}}> Delete </Link>
                            </div> : null}
                        {localStorage.accessLevel === ACCESS_LEVEL_NORMAL_USER ? 
                        <div id="buttons">
                            <Link className="buy-button" to={{pathname: `modForm/${this.state.id}`}}> Buy </Link>
                        </div> : null }
                    </div>
                </div>
            </div>
        )
    }

}