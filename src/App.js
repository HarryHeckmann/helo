import React, { Component } from 'react';
// import axios from 'axios'
import Nav from './Components/Nav/Nav'
import routes from './routes'

import './App.css'

class App extends Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     username: ''
  //   }
  // }

  // componentDidMount(){
  //   axios
  //     .get('/api/user')
  //     .then(response => {
  //       this.setState({username: response.data.username})
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  render() {
    return (
      <div id='appFull'>
       <Nav
        // username = {this.state.username}
       />
       {routes}
      </div>
    );
  }
}

export default App;
