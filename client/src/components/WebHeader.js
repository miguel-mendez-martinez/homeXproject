import React, {Component} from "react"

import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"

import { HomeOutline } from 'react-ionicons'
import { SkullOutline } from 'react-ionicons'
import { ReorderThreeOutline } from 'react-ionicons'

import {Link} from "react-router-dom"

export default class WebHeader extends Component 
{

    constructor(props) 
    {
        super(props)
        
        this.state = {
            showCategories: false
        }
    }
    render() 
    {   
        return ( 
                <div className = "header-container">
                    <div className="flexBox">
                        <div className="leftHeader">
                        <img src={require("../images/masterPiece.png")} alt=""/> 
                        </div>  
                        <div className="centerHeader">
                            <h2> All the Fat</h2>
                            <h6> From Skaters To Skaters</h6>
                        </div>
                        <div className="rightHeader">
                            {(localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER) ? <Link className="blue-button" to="/logInForm"> Login </Link> : null}
                            {(localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER) ? <Link className="green-button" to="/userForm"> Register </Link> : null}
                            {localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to="/logOut"> LogOut </Link> : null }
                            {<Link className="red-button" to="/resetDB"> Reset DB </Link> }
                        </div>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li>
                                <span>
                                    <HomeOutline className="navigation-icon" color={'#00000'} title={"home"} height="25px" width="25px"/>
                                    <Link className="navigation-item" to="/DisplayAllSkates">Home </Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <ReorderThreeOutline className="navigation-icon" color={'#00000'}  title={"about"} height="25px" width="25px"/>
                                    <Link className="navigation-item" to="/categories">Products </Link>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <SkullOutline className="navigation-icon" color={'#00000'}  title={"about"} height="25px" width="25px"/>
                                    <Link className="navigation-item" to="/about">About </Link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
        )
    }
}