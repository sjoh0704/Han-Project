const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();

router.get('/post/:postId/comment', async (req, res) => {
    const {postId} = req.params;
    try{
        const comments = await Comment.findAll({
            where:{
                postId
            },
        });

        res.send({
            payload:comments,
            message:"get comments success"
        });
    }
    catch(error){
        res.status(400).send({
            message: "get comments fails"
        })
        console.log(error);
    }
});

router.post('/post/:postId/comment', async (req, res) => {
    const {postId} = req.params;
    const {user_id, content} = req.body;
    
    if(!user_id){
        res.status(400).send({
            message:"user_id doesn't exist"
        });
    }
    else if(!content || content === ""){
        res.status(400).send({
            message:"content doesn't exist"
        });
    }
    try{
        let post = await Post.findOne({
            where: {
                id: postId
            }
        });
        if(!post){
            res.status(400).send({
                message: "post doesn't exist"
            });
            return;
        }
     
        const comment = await Comment.create({user_id, content});
    
        post.addComment(comment);        
        res.send({
            message: "create comment success"
        });

    }catch(error){
        console.log(error);
        res.status(400).send({
            message: "create comment fail"
        });
    }
});

router.get('/post/:postId/comment/:commentId', async (req, res) => {
    const {commentId} = req.params;
    const comment = await Comment.findOne({
        where:{
            id:commentId
        }
    });
    if(!comment){
        res.status(400).send({
            message:"comment doesn't exist"
        });
    }
    res.send({
        payload:comment,
        message:"comment get success"
    });
});

router.post('/post/:postId/comment/:commentId', async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;
    if(!content || content == ""){
        res.status(400).send({
            message:"content doesn't exist"
        });
    }

    const comment = await Comment.findByPk(commentId);
    if(!comment){
        res.status(400).send({
            message:"comment doesn't exist"
        });
    }
    comment.content = content;
    await comment.save();
    
    res.send({
        message:"comment update success"
    });

});

router.delete('/post/:postId/comment/:commentId', async (req, res) => {
    const {commentId} = req.params;
    try{
        await Comment.destroy({
            where:{
                id:commentId
            },
        });
        
        res.send({
            message:"comment delete success"
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send({
        message:"comment delete fail"
    });

    }
    
});

router.delete('/post/:postId/comment', async (req, res) => {
    const {postId} = req.params;
    try{
        await Comment.destroy({
            where:{
                postId
            },
        });
        
        res.send({
            message:"comment delete success"
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send({
        message:"comment delete fail"
    });

    }
});

module.exports = router;
