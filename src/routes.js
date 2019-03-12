import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Auth from '../src/Components/Auth/Auth'
import Dashboard from '../src/Components/Dashboard/Dashboard'
import Form from '../src/Components/Form/Form'
import Post from '../src/Components/Post/Post'

export default(
    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post/:postid' component={Post} />
        <Route path='/new' component={Form} />
        <Route exact path='/' component={Auth} />
    </Switch>
)
