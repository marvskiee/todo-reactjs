const router = require("express").Router();
let User = require("../models/user.model");

// select * user
router.get("/", async (req, res) => {
  User.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// login user
router.post("/login", async (req, res) => {
  await User.findOne(req.body)
    .then(async (response) => {
      if (response) return res.json({ success: true, data: response });
      else return res.json({ success: false });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

router.post("/register", async (req, res) => {
  await User.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err }));
});
// check user
router.get("/find/:id", async (req, res) => {
  await User.findById(req.params?.id)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err_1) => res.json({ success: false, message: err_1.message }));
});

module.exports = router;
