import React, {Component} from "react"

import {Redirect} from 'react-router-dom'

import WebHeader from "./WebHeader"

export default class Categories extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            redirectSkates:false,
            redirectEjes: false,
            redirectRuedas: false
        }

    }

    search = e => {

        switch(e.target.name){
            case 'skates':
                this.setState({redirectSkates: !this.state.redirectSkates})
                break
            case 'ejes':
                this.setState({redirectEjes: !this.state.redirectEjes})
                break
            case 'ruedas':
                this.setState({redirectRuedas: !this.state.redirectRuedas})
                break
        }
            
        
        
    }

    render() 
    {   
        return (           
            
            <div className="web-container">

                <WebHeader />
                
                <div className="category-container">
                    {this.state.redirectSkates ? <Redirect to={{ pathname: '/displayAllSkates', state: { id: 'skates' } }}/> : null}
                    {this.state.redirectEjes ? <Redirect to={{ pathname: '/displayAllSkates', state: { id: 'ejes' } }}/> : null}
                    {this.state.redirectRuedas ? <Redirect to={{ pathname: '/displayAllSkates', state: { id: 'ruedas' } }}/> : null}
                    <h1>Categories Container</h1>
                    {/* La cuestion aqui es sacar 3 imagenes, una de ejes, otra de skates y otra de ruedas, cada una llevaria a la zona de los productos de estos, es decir la pagina inicial pero con una consulta poniendo tipo=tipo, y el boton de home volvera todo a la normalidad */}
                    <input type="Button" defaultValue="skates" name="skates" onClick={this.search} />
                    <input type="Button" defaultValue="ejes" name="ejes" onClick={this.search} />
                    <input type="Button" defaultValue="ruedas" name="ruedas" onClick={this.search} />
                </div>
            </div> 
        )
    }
}