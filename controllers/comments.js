const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment, 
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
        userAvatar: req.user.avatar,
      });
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { commentCount: 1 } },
        { upsert: true }
      );
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.body.comment },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      // let comment = await Comment.deleteOne({ _id: req.body.comment.id});
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.commentid });
      await Post.findOneAndUpdate(
        { _id: req.params.postid },
        { $inc: { commentCount: -1 } }
      );
      console.log("Deleted Comment");
      res.redirect('/post/'+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  }
}