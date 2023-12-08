const signUpModel = require("../model/signUpModel");

const signUpControler = async (req, res) => {
  console.log("jjjjjjjjjjjj");
  const data = await signUpModel(req.body);
  res.send(data);
  // res.status(200).json({ message: "User signed up successfully" });9
};
module.exports = signUpControler;
