const jwt = require('jsonwebtoken');
const UserModel = require("../model/loginModel");

async function loginControler(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await UserModel.findOne({ email, password });

    if (user) {
      // User found, send a success response with user data and token
      const token = jwt.sign({ userId: user._id }, 'x_access_token', { expiresIn: '10h' });
      const userData = {
        _id: user._id,
        name: user.name, // Assuming 'name' is a property in your user model
        email: user.email // Assuming 'email' is a property in your user model
        // Add other user data properties as needed
      };

      res.json({ success: true, message: 'Login successful', user: userData, token });
    }else {
      // User not found, send an error response
      res.status(404).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle database or other errors
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { loginControler };
