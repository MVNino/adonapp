'use strict'

const Post = use('App/Models/Post')

class PostController {
    async index({ view }) {
        const hardCodedPosts = [
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
        
        const posts = await Post.all()

        return view.render('posts.index', {
            title: 'Latest Posts',
            posts: posts.toJSON(),
        })
    }

    async show({ params, view }) {
        const post = await Post.find(params.id)

        return view.render('posts.show', {
            title: 'Show a Post',
            post: post,
        })
    }

    async create({ view }) {
        return view.render('posts.create')
    }

    async store({ request, response, session }) {
        const post = new Post()

        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({ 
            notification: 'Post Added!'
        })
    
        return response.redirect('/posts')
    }

}

module.exports = PostController
