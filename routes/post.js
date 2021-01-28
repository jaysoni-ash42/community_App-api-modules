var express = require('express');
var router = express.Router();
var Post = require("../models/post");
const bodyparser=require("body-parser");
router.use(bodyparser.json());

/* GET home page. */
// get all the post with the current post posted
router.route('/post').get((req, res, next) => {
    Post.find({}).sort({ createdAt :-1,updatedAt:-1}).then((post)=>{
        res.setHeader("Content-Type",'application/json');
        res.statusCode=200;
        res.end(JSON.stringify(post));
    }).catch((err)=>{
        res.status(404);
        res.end("not able to fetch");
    })
    //Add a post
}).post((req,res,next)=>{
    console.log(req.body);
    Post.create(req.body).then((post)=>{
        res.setHeader("Content-Type",'application/json');
        res.statusCode=200;
        res.end(JSON.stringify(post));
    }).catch((err)=>{
        res.status(404);
        res.end(err.message);
    })
});
//post a comment
router.route("/post/:postId/comments").post((req,res,next)=>{
    async function postcomment()
    {
        try{
            var post = await Post.findById(req.params.postId);
        
        if(post)
        {
            post.comments.push(req.body);
            const comment = await post.save();
            res.setHeader("Content-Type",'application/json');
            res.statusCode=200;
            res.json(comment);
        }
    }catch(err){
        res.status(404);
        res.end(err.message);
    }

    }
    postcomment();

    // get all the comment of a particular post
}).get((req,res,next)=>{
    async function getcomment()
    {
        try{
            var post = await Post.findById(req.params.postId);
        
        if(post)
        {
            const comment =post.comments;
            res.setHeader("Content-Type",'application/json');
            res.statusCode=200;
            res.json(comment);
        }
    }catch(err){
        res.status(404);
        res.end(err.message);
    }

    }
    getcomment();

});
//delete a comment in a post
router.delete("/post/:postId/comments/:commentId",(req,res,next)=>{
    Post.findById(req.params.postId).then((post)=>{
        if(post)
        {
            for (i=0;i<post.comments.length;i++)
            {
                if(post.comments[i]._id==req.params.commentId)
                {
                    post.comments[i].remove();
                    post.save().then((post)=>{
                    res.setHeader("Content-Type",'application/json');
                        res.statusCode=200;
                        res.json(post);

                    }).catch((err)=>{
                        res.statusCode=404;
                        res.end(err.message);

    });
                }
            }
        }

    }).catch((err)=>{
        res.statusCode=404;
        res.end(err.message);

    });

});
//get all the post of a user to display in the grid
router.get("/post/:userId",(req,res,next)=>{
    Post.find({userid:`${req.params.userId}`}).then((post)=>{
        if(post!=null)
        {  
            res.setHeader("Content-Type",'application/json');
            res.statusCode=200;
            res.json(post);
       }
       else{
        res.status(200);
        res.end("no post");
       }
    }).catch((err)=>{
        res.status(404);
        res.end(err.message);
        
    })

});
//---Add a like in a post by a particular user
router.post("/post/:postId/like",(req,res,next)=>{
    async function postlike()
    {
        try{
            var post = await Post.findById(req.params.postId);
        
        if(post)
        {
            post.like.push(req.body);
            const like = await post.save();
            res.setHeader("Content-Type",'application/json');
            res.statusCode=200;
            res.json(like);
        }
    }catch(err){
        res.status(404);
        res.end(err.message);
    }

    }
    postlike();
});



module.exports = router;
