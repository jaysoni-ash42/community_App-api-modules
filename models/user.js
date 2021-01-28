var mongoose=require("mongoose");
var schema=mongoose.Schema;

var UserSchema=new schema(
    {
        userid:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        userimg:{
            type:String,
            required:true
        }

    },
        {
            timestamps:true
    }

);

var User = mongoose.model('User',UserSchema,collection = "User");
module.exports = User;
