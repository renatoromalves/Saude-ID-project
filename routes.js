const express = require("express");
const router = express.Router();
const PostController = require('./controllers/PostController');

router.get("/", PostController.listAll);

router.get("/post", (req, res) => res.render("single-post"));

router.get('/posts/add', PostController.add);

router.post('/posts/add', PostController.store);

router.get('/posts/:id', PostController.showPost);

router.get('/search', PostController.search);

router.post('/delete', PostController.delete);

router.get('/edit/:id', PostController.edit);

router.post('/update/:id', PostController.update);

module.exports = router;
