import React, {Component} from 'react'
import axios from 'axios';
import Loader from 'react-loader-spinner'

class Post extends Component{
    constructor(){
        super()
        this.state ={
            title: '',
            image: '',
            body: '',
            username: ''
        }
    }

    componentDidMount(){
        console.log(this.props) 
        axios
            .get(`/api/post/${this.props.match.params.postid}`)
            .then(response => {
                console.log(response.data[0])
                const post = response.data[0]
                this.setState({tite: post.post_title, image: post.post_image, body: post.post_body, username: post.username})
            })        
    }

    render(){
        return(
            <div>
                {this.state.username 
                    ?
                    <div className='skinnyPost'>
                        <h3>{this.state.title}</h3>
                        <div className='skinnyPostPicture'>
                            <p>by {this.state.username.toLowerCase()}</p>
                            <img src={`https://robohash.org/${this.state.username}`} alt='' style={{"borderRadius": "50%", "width": "50px", "backgroundColor": "#FFFFFF"}}/>
                        </div>
                        <div id='postBig'>
                            <img id='postImage' src={this.state.image}/>
                            <p>{this.state.body}</p>
                        </div>
                    </div>
                    :
                    <Loader type="Rings" color="#FF70A6" height={80} width={80} />
                
                }
                
            </div>
        )
    }
}

export default Post