import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserInfo } from '../../ducks/reducer'

import './Dashboard.css'

class Dashboard extends Component{
    constructor(){
        super()
        this.state ={
            user_id: '',
            search: '',
            checkbox: false,
            posts: []
        }

    }

    componentDidMount(){
        this.getLoggedInUser()
    }
    getPosts(){
        axios
            .get(`/api/posts/${this.state.user_id}?userposts=${this.state.checkbox}&search=${this.state.search}`)
            .then(response => {
                this.setState({posts: response.data})
                // console.log(this.state.posts)
            })
    }
    getLoggedInUser(){
        axios
            .get('/api/user')
            .then(response => {
                // console.log(response.data)
                this.setState({user_id: response.data[0].user_id}, () => {
                    this.getPosts()
                })
                this.props.getUserInfo(response.data[0].username)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleCheckbox(){
        this.setState({checkbox: !this.state.checkbox})
    }


    render(){
        return(
            <div id='dashboard'>
                <div id='searchBar'>
                    <div id='searchInput_button'>
                        <input
                            className='searchInput'
                            required 
                            type='text' 
                            name='search' 
                            placeholder='Search by Title'
                            onChange={(e) => this.handleChange(e)}
                            >
                        </input>
                        <img src={require('../../Images/search.png')} alt='' style={{"backgroundColor": "#FD9774"}} onClick={() => this.getPosts()}/>
                        <button>Reset</button>
                    </div>
                    <div>
                        <label for='myPosts'>My Posts</label>
                        <input
                            onChange={() => this.handleCheckbox()}
                            type='checkbox'
                            name='myPosts'
                        ></input>
                    </div>
                </div>
                <div id='postsColumn'>
                    {this.state.posts.map((e, i) => {
                        return(
                            <Link className='skinnyPostLink' to={`/post/${e.post_id}`}>
                                <div key={i} className='skinnyPost'>
                                    <h3>{e.post_title}</h3>
                                    <div className='skinnyPostPicture'>
                                        <p>by {e.username.toLowerCase()}</p>
                                        <img src={`https://robohash.org/${e.username}`} alt='' style={{"borderRadius": "50%", "width": "50px", "backgroundColor": "#FFFFFF"}}/>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default connect(null,{getUserInfo})(Dashboard)