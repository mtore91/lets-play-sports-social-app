const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: "asc" }).lean();
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ date: "asc" }).lean();
  //     res.render("feed.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },  
  getFeed: async (req, res) => {
    try {
      const userLocation = req.user.coordinates.coordinates;
      const maxDistance = 15000;

      const posts = await Post.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: userLocation },
            maxDistance: maxDistance,
            distanceField: "distance",
            spherical: true
          }
        },
        {
          $sort: { date: 1 }
        }
      ]);
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  }
, 
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find( { post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments:comments });
    } catch (err) {
      console.log(err);
    }
  },
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Post.create({
  //       sport: req.body.sport,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       likes: 1,
  //       createdById: req.user.id,
  //       createdBy: req.user.userName,
  //       date: req.body.date,
  //       time: req.body.time,
  //       address: req.body.address,
  //       playersNeeded: req.body.playersNeeded,
  //       joinedUsers: [req.user.userName],
  //       joinedUserIds: [req.user.id],
  //       joinedUserNumber: 1,
  //     });
  //     console.log("Event has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createPost: async (req, res) => {
    try {
        const newPost = {
            sport: req.body.sport,
            likes: 1,
            createdById: req.user.id,
            createdBy: req.user.userName,
            date: req.body.date,
            time: req.body.time,
            address: req.body.formattedAddress,
            coordinates: { type: 'Point',
              coordinates: JSON.parse(`[${req.body.coordinates}]`)
          },
            playersNeeded: req.body.playersNeeded,
            joinedUsers: [req.user.userName],
            joinedUserIds: [req.user.id],
            joinedUserNumber: 1,
            commentCount: 0,
        };
        // If an image was submitted, add it to the newPost object
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            newPost.image = result.secure_url;
            newPost.cloudinaryId = result.public_id;
        }

        await Post.create(newPost);
        console.log("Event has been added!");
        res.redirect("/profile");
    } catch (err) {
        console.log(err);
    }
},
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1, joinedUserNumber: 1},
          $push: { joinedUsers: req.user.userName, joinedUserIds: req.user.id }
        }
      );
      console.log("A player joined");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    } 
  },
  unlikePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: -1, joinedUserNumber: -1},
          $pull: { joinedUsers: req.user.userName }
        }
      );
      console.log("A player left");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
