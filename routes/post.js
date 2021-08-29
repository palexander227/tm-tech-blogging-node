const express = require('express');
const router = express.Router()
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const path = require('path');
const passport = require('passport')
require('../config/passport')(passport)

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const pageLimit = 5;
        const pageNo = req.query.pageNo?req.query.pageNo:1;

        // Comment.hasMany(Post, {foreignKey: 'postId'})

        const posts = await Post.findAll({ 
            attributes: ['id','title','content','image','createdAt','updatedAt','userId'],
            where: { userId: req.user.id },
            limit: pageLimit,
            offset:((pageNo - 1) * pageLimit)
        });
        res.status(200).send({ message: '', posts })
    }
    catch (err) {
        res.status(500).send({ message: 'Some error occured while fetching posts for logged in user' })
    }
})

router.get('/:postid/comments', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { postId: req.params.postid } });
        res.status(200).send({ message: '', comments })
    }
    catch (err) {
        res.status(500).send({ message: 'Some error occured while fetching comments by post id' })
    }
})

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        let files = undefined;
        if (req._fileparser) {
            files = req._fileparser.upstreams.length
                ? req.file("postImage")
                : undefined;
        }
        let fileName = '';
        if(files){
            files.upload({
                adapter: require('skipper-s3'),
                key: process.env.BUCKET_KEY,
                secret: process.env.BUCKET_SECRET,
                bucket: process.env.BUCKET_NAME,
                maxBytes: 10000000, 
                dirname: '',
            }, async (err, uploadedImg) => {
                if (err) return res.status(400).send({ err });
                fileName = `https://thoughtmuseum-image-hosting.s3.us-east-2.amazonaws.com/${uploadedImg[0].fd}`;
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

router.put('/:postid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { postid } = req.params;

    try {
        const post = await Post.findByPk(postid, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ['firstName', 'lastName']
                }
            ]
        });
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

router.delete('/:postid', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
            ? req.file("upload")
            : undefined;
    }
    files.upload({
        adapter: require('skipper-s3'),
        key: process.env.BUCKET_KEY,
        secret: process.env.BUCKET_SECRET,
        bucket: process.env.BUCKET_NAME,
        maxBytes: 10000000, 
        dirname: '',
    }, async (err, uploadedImg) => {
        if (err) return res.status(400).send({ err });
        const mediaPath = `https://thoughtmuseum-image-hosting.s3.us-east-2.amazonaws.com/${uploadedImg[0].fd}`;
        res.send({uploaded: true, url: mediaPath});
        /*res.status(200).send({"error": {
                "message": "The image upload failed because the image was too big (max 1.5MB)."
            }
        })*/
    })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.get('/allpost', async (req, res) => {
    try {
        const pageLimit = 10;
        const pageNo = req.query.pageNo?req.query.pageNo:1;
        const userId = req.query.userId?req.query.userId:null;
        const query = {
            limit: pageLimit,
            offset:((pageNo - 1) * pageLimit),
            include: [
                {
                    model: User, 
                    as: "user",
                    attributes: ['firstName', 'lastName']
                }
            ]
        };
        console.log(userId)
        if (userId && userId !== 'null') {
            query.where = {userId: userId};
        }
        console.log(query)
        const {count, rows: posts} = await Post.findAndCountAll(query);
        res.status(200).send({ message: '', posts, count })
    }
    catch (err) {
        res.status(500).send({ message: 'Some error occured while fetching posts' })
    }
})

router.get('/:postid', async (req, res) => {
    const { postid } = req.params;
    try {
        const post = await Post.findByPk(postid, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ['firstName', 'lastName', ['id', 'userId']]
                }
            ]
        });
        res.status(200).send({ message: '', post })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Some error occured while fetching posts' })
    }
})



module.exports = router