const express = require('express');
const router = express.Router()
const Post = require('../models/post');
const Comment = require('../models/comment');
const path = require('path');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { userId: req.user.id } });
        res.status(200).send({ message: '', posts })
    }
    catch (err) {
        res.status(500).send({ message: 'Some error occured while fetching posts for logged in user' })
    }
})

router.get('/:postid/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { postId: req.params.postid } });
        res.status(200).send({ message: '', comments })
    }
    catch (err) {
        res.status(500).send({ message: 'Some error occured while fetching comments by post id' })
    }
})

router.post('/', async (req, res) => {
    try {

        let files = undefined;
        if (req._fileparser) {
            files = req._fileparser.upstreams.length
                ? req.file("postImage")
                : undefined;
        }
        let fileName = '';
        
        if(files){
            console
            files.upload({
                maxBytes: 10000000, 
                dirname: path.join(__dirname, '..', 'upload'),
            }, async (err, uploadedImg) => {
                if (err) return res.status(400).send({ err });
                let splitList = uploadedImg[0].fd.split('\\');
                fileName = splitList[splitList.length - 1];
                const post = await Post.create({
                    title: req.body.title,
                    content: req.body.content,
                    userId: req.user.id,
                    image:fileName
                });
                res.status(201).send({ message: 'Post created', post });
                //res.status(200).send({message: 'uploaded successfully...', data: {url: uploadedImg[0].fd}});
            })
        }else{
            const post = await Post.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id,
                image:fileName
            });
            res.status(201).send({ message: 'Post created', post });
        }

        
    }
    catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError')
            res.status(500).send({ message: 'User ID is invalid' })
        else
            res.status(500).send({ message: 'Error creating Post details' })
    }
})

router.put('/:postid', async (req, res) => {
    const { postid } = req.params;

    try {
        const post = await Post.findByPk(postid);
        if (post) {
            post.title = req.body.title
            post.content = req.body.content

            await post.save();
            res.status(200).send({ message: 'Post updated successfully', post });
        }
        else {
            res.status(200).send({ message: 'Post not found' });
        }
    }
    catch (err) {
        res.status(500).send({ message: 'Error updating post details' })
    }
})

router.delete('/:postid', async (req, res) => {
    const { postid } = req.params;

    try {
        const post = await Post.findByPk(postid);
        if (post) {
            post.destroy();
            res.status(200).send({ message: 'Post deleted successfully' });
        }
        else {
            res.status(200).send({ message: 'Post not found' });
        }
    }
    catch (err) {
        res.status(500).send({ message: 'Error deleting post details' })
    }
})


router.post('/file_upload', function(req, res) {
    let files = undefined;
    if (req._fileparser) {
        files = req._fileparser.upstreams.length
            ? req.file("catfile")
            : undefined;
    }
    files.upload({
        maxBytes: 10000000, 
        dirname: path.join(__dirname, '..', 'upload'),
    }, async (err, uploadedImg) => {
        if (err) return res.status(400).send({ err });
        console.log(uploadedImg[0].fd);
        let splitList = uploadedImg[0].fd;
        let lastElement = splitList[splitList.length - 1];
        res.status(200).send({message: 'uploaded successfully...', data: {url: uploadedImg[0].fd}});
    })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});



module.exports = router