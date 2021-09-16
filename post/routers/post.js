const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();

router.post('/post', async (req, res) => {

    const {user_id, title, description, area} = req.body;
    try{
        await Post.create({
            user_id,
            title,
            description,
            area
        });
        res.send({
            message: "create success",
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            message: "create fail",
        });
    }
    


});

router.get('/post', async (req, res) => {
    const posts = await Post.findAll({ limit: 10, order: [['updatedAt', 'DESC']]});
    res.send({
        payload:posts,
        message: "success"
    });
});


router.get('/post/page/:pageNumber', async (req, res) => {
    const displaySize = 1; 
    const offset = (Number(req.params.pageNumber) - 1) * displaySize;
    const posts = await Post.findAll({ offset: offset, limit: displaySize, order: [['updatedAt', 'DESC']]});
    res.send({
        payload:posts,
        message: "success"
    });
});


router.get('/post/:postId', async (req, res) => {
    const {postId} = req.params;
    const post = await Post.findOne({
        where:{
            id:postId
        }
    });

    if(!post){
        res.status(400).send({
            message: "not exist"
        });
    }
    res.send({
        payload:post
    });
});


router.get('/post/:postId/hit', async (req, res) => {
    const {postId} = req.params;

    const post = await Post.findOne({
        where:{
            id:postId
        }
    });
    if(!post){
        res.status(400).send({
            message: "not exist"
        });
        return;
    }
    post.hit++;
    await post.save();
    res.send({
        message: "hit update success"
    });
});

router.post('/post/:postId', async (req, res) => {
    const {postId} = req.params;
    const {title, description, area} = req.body;
    try{
        const post = await Post.findOne({
            where:{
                id:postId
            }
        });
        if(!post){
            res.status(400).send({
                message:"post doesn't exist"
            });
        }

        await Post.update({
            title, 
            description,
            area
        }, {
            where: {
                id: postId
            }
        });
        // attriubute가 undefined여면 값을 업데이트하지 않음.
        res.send({
            message:"update success"
        });
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            message: "update fail"
        });
    }

});

router.delete('/post/:postId', async (req, res) => {
    const {postId} = req.params;
    try{
        await Post.destroy({
            where:{
                id: postId
            }
        });
        // 존재하지 않아도 지운다. 
        res.send({
            message: "delete success"
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            message: "delete fail"
        });
    }

});

module.exports = router;
