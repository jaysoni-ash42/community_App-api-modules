var mongoose=require("mongoose");
var schema=mongoose.Schema;

var CommentSchema=new schema(
    {
    
        text:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        }
    },
        {
            timestamps:true
    }

);
var LikeSchema=new schema({
    id:{
        type:String,
    },
});

var postSchema=new schema({
    userid:{
        type:String,
        required:true,
    },
    userimg:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    comments:[CommentSchema],
    like:[LikeSchema]
    
},
    {
        timestamps : true
});

var Post = mongoose.model('Post',postSchema,collection = "Post");
module.exports = Post;
