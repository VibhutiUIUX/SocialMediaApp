const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Simple Social Media App");
});

// ================= REGISTER =================

app.post("/register", async (req, res) => {

    try {

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        res.json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ================= LOGIN =================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (user) {

            res.json({
                message: "Login Successful"
            });

        } else {

            res.json({
                message: "Invalid Email or Password"
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ================= CREATE POST =================

app.post("/createPost", async (req, res) => {

    try {

        const newPost = new Post({

            username: req.body.username,

            text: req.body.text

        });

        await newPost.save();

        res.json({

            message: "Post Created Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// ================= GET POSTS =================

app.get("/posts", async (req, res) => {

    const posts = await Post.find();

    res.json(posts);

});

// ================= LIKE POST =================

app.put("/like/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        res.json({

            message: "Post Liked"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
// ================= ADD COMMENT =================

app.put("/comment/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        post.comments.push(req.body.comment);

        await post.save();

        res.json({
            message: "Comment Added"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ================= START SERVER =================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});