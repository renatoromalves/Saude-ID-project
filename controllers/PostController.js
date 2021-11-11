const { Sequelize } = require("sequelize");
const Posts = require('../models/Posts.js');
const Op = Sequelize.Op

exports.add = (req, res) => {
  res.render('add-posts', {
    title: 'Adicionar Post - Blog'

  });
}
exports.store = async (req, res) => {
  const post = await Posts.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    category: req.body.category
  });
  res.redirect('/');
}

exports.listAll = async (req, res) => {
  const posts = await Posts.findAll();
  res.render('home', {
    posts: posts,
    title: 'Blog'
  })

}

exports.showPost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne(
    {
      where:
      {
        id: id
      }
    });
  res.render('single-post', {
    post: post,
    title: `${post.title} - Blog`
  })
}

exports.search = async (req, res) => {
  const query = req.query.search
  const posts = await Posts.findAll(
    {
      where:
      {
        title: {
          [Op.like]: `%${query}%`
        }
      }
    }
  );
  res.render('search', {
    title: `Resultados para ${query} - Blog`,
    posts: posts,
    query: query
  });
}

exports.delete = async (req, res) => {
  const id = req.body.id
  console.log(id)

  const post = await Posts.destroy(
    {
      where:
      {
        id: id
      }
    });
  res.redirect("/");
}

exports.edit = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const post = await Posts.findOne(
    {
      where:
      {
        id: id
      }
    });
  res.render('edit', {
    post: post,
    title: `Editar - ${post.title} - Blog`
  })
}

exports.update = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const category = req.body.category;
  const { id } = req.params;
  console.log(id, title, description, author)
  const post = await Posts.update(
    {
      title: title,
      description: description,
      author: author,
      category: category
    },
    {
      where:
      {
        id: id
      }
    });
  res.redirect("/");
}