import React, {Component} from "react"
import {Link} from "react-router-dom"



export default class FilterModal extends Component{

    constructor(props) 
    {
        super(props)

        this.state = {
                    category: this.props.category,
                    brand: '',
                    size: 50,
                    price: 8,
                    apply : false  }
    }


    onPriceInput = () =>{
        let slider = document.getElementById("priceRange");
        let output = document.getElementById("outputPriceSlider");
        output.innerHTML = slider.value;
        this.setState({price: slider.value})
    }

    onSizeInput = () =>{
        let slider = document.getElementById("sizeRange");
        let output = document.getElementById("outputSizeSlider");
        output.innerHTML = slider.value;
        this.setState({size: slider.value})
    }

    handleChange = e =>{
        this.setState({brand: e.target.value})
    }

    render(){
        return(
            <div id="modal"> 
                <div id="modalContent">
                    <div className="modal-body">
                        <div id="info">
                            <div id="title">
                                <h1>Filters</h1>
                            </div>
                            <div id="exit" onClick={this.props.closeModal}>
                                <img src= {require("../images/exit.png")} alt="/"/>
                            </div>
                        </div>
                        <div id="productInfo">
                            <div id="brandContainer">
                                <h4>Brand:</h4>
                                <input id="filterInput" type="text" name="brand" onChange={this.handleChange}/>
                            </div>
                            <div id="slideContainer">
                                <h4>Price max: <span id="outputPriceSlider"> 50</span></h4>
                                <input type="range" min="1" max="150" value="50" className="slider" id="priceRange" onChange={this.onPriceInput}/>
                            </div>
                            <div id="slideContainer">
                                <h4>Size: <span id="outputSizeSlider"> 8</span></h4>
                                <input type="range" min="6" max="9.5" value="8" className="slider" id="sizeRange" step={0.25} onChange={this.onSizeInput}/>
                            </div>
                        </div>
                        <div id="buttons">
                            <Link className="green-button" to={ { pathname: `DisplayAllSkates`, state: { id: this.state.category, brand: this.state.brand, size: this.state.size, price: this.state.price, apply: true} }}>Apply</Link>
                            <Link className="blue-button" to={ { pathname: `DisplayAllSkates`, state: { id: '', apply: false} }}>Clear</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}