import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


import {getUserInfo } from '../../ducks/reducer'


import './Auth.css'

class Auth extends Component{
    constructor(){
        super()
        this.state ={
            username: '',
            password: '',

            redirect: false
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleLogin(e){
        e.preventDefault()
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.getUserInfo(this.state.username)
        axios
            .post('/auth/login', {creds})
            .then(response => { 
                this.setState({username: '', password: '', redirect: true})
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                alert('Invalid Credentials')
            })
    }
    handleRegister(e){
        e.preventDefault()
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.getUserInfo(this.state.username)
        axios 
            .post('/auth/register', {creds})
            .then(user => {
                this.setState({username: '', password: '', redirect: true})
            })
            .catch(err => {
                alert('Username Taken')
            })
    }
    // renderRedirect(){
    //     if(this.state.redirect){
            
    //     }
    // }

    render(){
        return(
            <div id='auth'>
            {/* {this.renderRedirect()} */}
                <div id='authContainer'>
                    <img src={require('../../Images/logo.png')}/>
                    <h1>Helo</h1>
                    <form id='authForm' onSubmit={(e) => this.handleLogin(e)}>
                        <div className='inputDiv'>
                            <label for='username'>Username: </label>
                            <input
                                className='authInput'
                                id='username'
                                required 
                                type='text' 
                                name='username' 
                                // placeholder='username'
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div className='inputDiv'>
                            <label for='password'>Password: </label>
                            <input
                                className='authInput' 
                                id='password'
                                required 
                                type='text' 
                                name='password' 
                                // placeholder='password'
                                onChange={(e) => this.handleChange(e)}
                            ></input>
                        </div>
                        <div id='authButtonDiv'>
                            <input
                                className='authButton'
                                name='login'
                                type='submit'
                                value='Login'
                                // onClick={(e) => e.preventDefault()}
                            ></input>
                            <input
                                className='authButton'
                                name='register'
                                type='button'
                                value='Register'
                                onClick={(e) => this.handleRegister(e)}
                            ></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}




export default connect(null,{getUserInfo})(Auth)