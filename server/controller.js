module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.query)
        console.log(req.params)
        try{
            const posts = await db.get_posts([req.params.user_id, req.query.userposts, req.query.search])
            // console.log(posts)
            if(req.query.userposts === true){
                const filteredPosts = posts.filter((e, i) => {
                    e.user_id !== req.params.user_id
                })
                res.status(200).json(filteredPosts)
                console.log(filteredPosts, 'filtered')
            }
            else{
                res.status(200).json(posts)
                console.log(posts, 'posts')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
        
    },
    getPost: async (req, res) => {
        const db = req.app.get('db')
        try{
            const posts = await db.get_post([req.params.post_id])
            res.status(200).json(posts)
            // console.log(posts, 'posts')
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
        
    },
    newPost: async (req, res) => {
        const db = req.app.get('db')
        const post = req.body.newPost
        console.log(req.session.user)

        try{
            const newest = await db.new_post([post.title, post.body, post.image, req.session.user.id])
            res.status(200).json(newest)
            // console.log(post)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
        
    }
}