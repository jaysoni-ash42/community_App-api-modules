const express = require('express');
const router = express.Router();
var User = require("../models/user");
var Post = require("../models/post");
const bodyparser = require("body-parser");
const { json } = require('body-parser');
router.use(bodyparser.json());

router.route("/user").post((req, res, next) => {
    console.log(req.body.userid);
    User.find({ userid: `${req.body.userid}` }).then((user) => {
        if (Object.keys(user).length > 0) {
            res.setHeader('Content-type', 'application/json');
            res.status(200);
            res.json({ status: 200 });
        }
        else {
            User.create(req.body).then((user) => {
                res.setHeader("Content-Type", 'application/json');
                res.statusCode = 200;
                res.json(user);

            }, err => next(err));
        }

    }).catch((err) => {
        res.status(404);
        res.end(err.message);
    });
});
router.get("/search/:username", (req, res, next) => {
    User.find({ username: `${req.params.username}` }).then((user) => {
        if (Object.keys(user).length > 0) {
            Post.find({ userid: `${user[0].userid}` }).then((post) => {
                if (Object.keys(post).length > 0) {
                    res.setHeader("Content-type", "application/json");
                    res.statusCode = 200;
                    res.json({ user: user, post: post })
                }
                else {
                    res.setHeader("Content-type", "application/json");
                    res.statusCode = 200;
                    res.json({ user: user, post: null })
                }

            }).catch((err) => {
                res.statusCode = 404;
                res.end("post not found");
            })
        }
        else {
            res.statusCode = 404;
            res.end("user not found");
        }

    }).catch((err) => {
        res.statusCode = 404;
        res.end("user not find");

    })

})

module.exports = router;