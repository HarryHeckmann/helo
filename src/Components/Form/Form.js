import React, {Component} from 'react'
import axios from 'axios'

class Form extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            imageUrl: '',
            content: ''
        }
    }


    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    post(){
        const newPost = {
            title: this.state.title,
            image: this.state.imageUrl,
            body: this.state.content
        }
        axios
            .post('/api/create', {newPost})
            .then(response => {
                this.props.history.push(`/post/${response.data[0].post_id}`)
            })
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <div id='newPost'>
                    <label>Title</label>
                    <input name='title' type='text' onChange={(e) => this.handleChange(e)}></input>
                    <label>Image Url</label>
                    <input name='imageUrl' type='text' onChange={(e) => this.handleChange(e)}></input>
                    <label>Content</label>
                    <textarea name='content' rows="4" cols="50" onChange={(e) => this.handleChange(e)}></textarea>
                    <button onClick={() => this.post()}>Post</button>
                </div>
            </div>
        )
    }
}

export default Form