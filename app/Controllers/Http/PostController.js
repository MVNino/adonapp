'use strict'

const { post } = require("@adonisjs/framework/src/Route/Manager")

const Post = use('App/Models/Post')
const { validate } = use('Validator')

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
        // Validate input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3',
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = new Post()

        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({ 
            notification: 'Post Added!'
        })
    
        return response.redirect('/posts')
    }

    async edit({ params, view }) {
        const post = await Post.find(params.id)

        return view.render('posts.edit', {
            title: `Edit ${post.title}`,
            post: post,
        })
    }

    async update({ params, request, response, session }) {
        // Validate input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3',
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = await Post.find(params.id)

        post.title = request.input('title')
        post.body = request.input('body')
        await post.save()

        session.flash({ notification: 'Post updated!' })

        return response.redirect('/posts')
    }

    async destroy({ params, session, response }) {
        const post = await Post.find(params.id)

        post.delete()

        session.flash({ notification: 'Post has been removed!' });

        return response.redirect('/posts');
    }

}

module.exports = PostController
