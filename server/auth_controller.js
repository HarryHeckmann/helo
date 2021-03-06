const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        // console.log(req.body)
        const {username, password} = req.body.creds
        const existingUser = await db.get_user(username)
        if(existingUser[0]){
            return res.status(401).json('Username taken')
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const result = await db.register_user([username, hash])
            // console.log(result)
            req.session.user = {username: result[0].username, id: result[0].id}
            return res.status(200).json(req.session.user)
        }
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body.creds
        const foundUser = await db.get_user(username)
        console.log(req.body)
        if(!foundUser[0]){
            res.status(401).json('User not found. Please register as a new user before logging in')
        }
        else {
            isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash)
            if(!isAuthenticated){
                res.status(403).json('Incorrect Password')
            }
            else {
                req.session.user = {username: foundUser[0].username, id: foundUser[0].user_id}
                // console.log(req.session.user)
                res.status(200).json(req.session.user)
            }
        }
    },
    getUser: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const user = await db.get_user(req.session.user.username)
                console.log(user)
                return res.status(200).json(user)
            }
            else{
                console.log('womp')
                return res.status(404).json('not logged in')
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json('Not logged in')
        }
        
        
    },

    logout: (req, res) => {
        console.log('logged out')
        req.session.destroy()
        return res.sendStatus(200)
    }



}