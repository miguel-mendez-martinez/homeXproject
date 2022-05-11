import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'


export default class NavBarResidents extends Component 
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
                    <div className={this.props.selected == 0 ? "navBar-item-b":"navBar-item"}>
                        <div className="navBarItemIcon">
                            <img className="navBarIcon" src={require("../images/homeIcon.png")} alt="" />
                        </div>
                        <h2 id="homeText">Home</h2>
                    </div>
                    <div className="navBar-item">
                        <div className="navBarItemIcon">                       
                            <img className="navBarIcon" src={require("../images/contractsIcon.png")} alt="" />
                        </div>
                        <h2>Contracts</h2>
                    </div>
                    <div  className="navBar-item">
                        <div className="navBarItemIcon">
                            <img className="navBarIcon" src={require("../images/billsIcon.png")} alt="" />
                        </div>
                        <h2 id="billsText">Bills</h2>
                    </div>
                    <div className="navBar-item">
                        <div className="navBarItemIcon">
                        <img className="navBarIcon" src={require("../images/profileIcon.png")} alt="" />
                        </div>
                        <h2 id="profileText">Profile</h2>
                    </div>
                </div>
                <Link to="/logOut">
                    <div className="logout-container">
                        <div className="navBarItemIcon">
                            <img className="navBarIcon" src={require("../images/logOutIcon.png")} alt="" />
                        </div>
                        <h2>Log Out</h2>
                    </div>
                </Link>
            </div>
        )
    }
}