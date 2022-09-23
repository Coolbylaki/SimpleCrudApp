const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuid } = require("uuid") // Random ID NPM

// Paths for running server from any pwd 
app.use(express.static(path.join(__dirname, "/public")))
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs"); // Templating engine

// Include both parsers
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());

// Fake database for manipulation
const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

// render comments page
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

// render new comment page
app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})

// Add new comment and redirect
app.post("/comments", (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuid() })
    res.redirect("/comments")
})

// Render comment in more details
app.get("/comments/:id", (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id) // Object with that ID
    if (comment) {
        res.render("comments/show", { comment })
    } else {
        res.render("comments/error", { id }) // Error page for invalid ID
    }
})

// Edit comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params
    const foundComment = comments.find(c => c.id === id)
    const newCommentText = req.body.comment
    foundComment.comment = newCommentText
    res.redirect("/comments")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
