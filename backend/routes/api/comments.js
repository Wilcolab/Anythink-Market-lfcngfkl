/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * Retrieves all comments from the database.
    * @name GET/
    * @function
    * @memberof module:routes/api/comments
    * @returns {Object[]} 200 - Array of comment objects
    * @returns {Error} 500 - Internal server error
    */

 /**
    * DELETE /:id
    * Deletes a comment by its ID.
    * @name DELETE/:id
    * @function
    * @memberof module:routes/api/comments
    * @param {string} req.params.id - The ID of the comment to delete
    * @returns {Object} 200 - Success message
    * @returns {Object} 404 - Comment not found message
    * @returns {Error} 500 - Internal server error
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// add another new endpoint for deleting a comment
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});