const express = require("express");
const signUpControler = require("../controler/signUpControler");

const router = express.Router();

router.post("/signUpApi", signUpControler);
router.get("/get", (req, res) => {
  res.send("GetApi");
});
module.exports = router;
