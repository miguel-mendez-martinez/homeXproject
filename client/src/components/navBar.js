import React, {Component} from "react"
import { HomeOutline } from 'react-ionicons'
import { DocumentsOutline } from 'react-ionicons'
import { WalletOutline } from 'react-ionicons'
import { PersonOutline } from 'react-ionicons'
import { LogOutOutline } from 'react-ionicons'


export default class navBar extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {
            selected: this.props.selected
        }
    }
    render() 
    {   
        return (       
            <div className="navbar-container">
                <div className="logo-container">
                    <img id="littleSizeLogo" src={require("../images/logo.png")} alt=""/>
                </div>
                <div className="nav-items">
                    <div className="item-1">
                        <HomeOutline
                        color={'#00000'} 
                        title={Home}
                        height="250px"
                        width="250px"
                        />
                    </div>
                    <div className="item-2">
                        <DocumentsOutline
                        color={'#00000'} 
                        title={Contracts}
                        height="250px"
                        width="250px"
                        />
                    </div>
                    <div className="item-3">
                        <WalletOutline
                        color={'#000000'} 
                        title={Bills}
                        height="250px"
                        width="250px"
                        />
                    </div>
                    <div className="item-4">
                        <PersonOutline
                        color={'#000000'} 
                        title={Profile}
                        height="250px"
                        width="250px"
                        />
                    </div>
                </div>
                <div className="logout-container">
                    <LogOutOutline
                    color={'#ff0000'} 
                    title={LogOut}
                    height="250px"
                    width="250px"
                    />
                </div>
            </div>
        )
    }
}