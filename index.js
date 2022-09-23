const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true, }));
app.use(express.json());

const comments = [
    {
        id: 1,
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: 2,
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 3,
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: 4,
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})

app.post("/comments", (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment })
    res.redirect("/comments")
})

app.get("/comments/:id", (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === parseInt(id)) // Object with that ID
    if (comment) {
        res.render("comments/show", { comment })
    } else {
        res.render("comments/error", { id })
    }

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
