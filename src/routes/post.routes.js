const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
