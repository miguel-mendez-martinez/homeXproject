import React, {Component} from "react"
import { HomeOutline } from 'react-ionicons'
import { DocumentsOutline } from 'react-ionicons'
import { WalletOutline } from 'react-ionicons'
import { PersonOutline } from 'react-ionicons'
import { LogOutOutline } from 'react-ionicons'


export default class NavBar extends Component 
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
                        <HomeOutline color={'#00000'} title={"home"} height="25px"width="25px"/>
                        <h2>Home</h2>
                    </div>
                    <div className="item-2">
                        <DocumentsOutline color={'#00000'} title={"contracts"} height="25px" width="25px"/>
                        <h2>Contracts</h2>
                    </div>
                    <div className="item-3">
                        <WalletOutline color={'#000000'} title={"bills"} height="25px" width="25px"/>
                        <h2>Bills</h2>
                    </div>
                    <div className="item-4">
                        <PersonOutline color={'#000000'} title={"profile"} height="25px" width="25px"/>
                        <h2>Profile</h2>
                    </div>
                </div>
                <div className="logout-container">
                    <LogOutOutline color={'#ff0000'} title={"logout"} height="25px" width="25px"/>
                    <h2>LogOut</h2>
                </div>
            </div>
        )
    }
}