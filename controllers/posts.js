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
      const selectedDistance = Number(req.query.selectedDistance);
      const selectedSport = req.query.selectedSport || 'all'
      const maxDistance = selectedDistance || 5000;
      console.log(maxDistance)
      let query = [
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
      ];
  
      if (selectedSport !== 'all') {
        query.push({
          $match: { sport: selectedSport }
        });
      }
  
      const posts = await Post.aggregate(query);
      res.render("feed.ejs", { posts: posts, user: req.user, selectedDistance: selectedDistance, selectedSport:selectedSport });
    } catch (err) {
      console.log(err);
    }
  }, 
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
        const sport = req.body.sport;
        const formattedSport = sport.charAt(0).toUpperCase() + sport.slice(1).toLowerCase();
      //   if (!req.body.sport || !req.body.formattedAddress || !req.body.coordinates || !req.body.date || !req.body.playersNeeded || req.body.playersNeeded <= 0) {
      //     return res.status(400).send({ error: "One or more required fields are missing or invalid" });
      // }
      
        const newPost = {
            sport: formattedSport,
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
        // res.status(400).json({error: 'One or more fields are missing or invalid. Please try again.'});
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
