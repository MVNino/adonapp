'use strict'

class PostController {
    async index({ view }) {
        const posts = [
            {
                title: 'Post One',
                body: 'Post One body',
            },
            {
                title: 'Post Two',
                body: 'Post Two body',
            },
            {
                title: 'Post Three',
                body: 'Post Three body',
            },
        ]
        
        
        return view.render('posts.index', {
            title: 'Marlon title',
            posts: posts,
        })
    }


}

module.exports = PostController
