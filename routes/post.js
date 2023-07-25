const router = require("express").Router();
let Post = require("../models/post.model");

// select * post
router.get("/", async (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add post
router.post("/add", async (req, res) => {
  await Post.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// delete post
router.delete("/delete/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params?.id)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

//update post
router.put("/update/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params?.id, req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// truncate collection post
// router.delete("/truncate", async (req, res) => {
//   await Post.deleteMany()
//     .then(() => res.json("Post truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
