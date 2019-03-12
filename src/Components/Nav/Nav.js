import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import './Nav.css'

function Nav(props){
    function logout(){
        axios
            .delete('/auth/logout')
            .then(response => {
                props.history.push('/')
            })
    }
    function home(){
        props.history.push('/dashboard')
    }
    function newPost(){
        props.history.push('/new')
    }
    return(
        <div>
            {props.location.pathname === '/' 
                ?
                    <div id='emptyNav'></div>
                :
                    <div id='navBar'>
                        <div id='upperNav'>
                            <img src={`https://robohash.org/${props.username}`} alt='' style={{"borderRadius": "50%", "width": "100px", "backgroundColor": "#FFFFFF"}}/>
                            <h3>{props.username}</h3>
                            <img src={require('../../Images/home.png')} style={{"width": "50px"}} onClick={() => home()}/>
                            <img src={require('../../Images/new.png')} style={{"width": "50px"}} onClick={() => newPost()}/>
                        </div>
                        <img src={require('../../Images/logout.png')} style={{"width": "50px", "marginBottom": "25px"}} onClick={() => logout()} />
                    </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    const {username} = state
    return {username}
}

export default withRouter(connect(mapStateToProps)(Nav))

