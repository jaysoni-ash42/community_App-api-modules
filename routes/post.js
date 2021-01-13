var express = require('express');
var router = express.Router();
var Post = require("../models/post");
const bodyparser=require("body-parser");
router.use(bodyparser.json());

/* GET home page. */
router.get('/post',(req, res, next) => {
    Post.find({}).sort({ createdAt :-1,updatedAt:-1}).then((post)=>{
        res.setHeader("Content-Type",'application/json');
        res.statusCode=200;
        res.end(JSON.stringify(post));
    }).catch((err)=>{
        res.status(404);
        res.end("not able to fetch");
    })
}).post('/post',(req,res,next)=>{
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
router.post("/post/:postId/comments",(req,res,next)=>{
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

}).get("/post/:postId/comments",(req,res,next)=>{
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

})
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

}).delete("/post/:userId",(req,res,next)=>{
    Post.remove({userid:`${req.params.userId}`}).then((post)=>{
                    res.setHeader("Content-Type",'application/json');
                    res.statusCode=200;
                        res.json(post);

                }).catch((err)=>{
                    res.setHeader("Content-Type",'application/json');
                    res.statusCode=404;
                    res.end(new Error("no post found"));
                })

});
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
