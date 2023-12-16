const {signUpModel ,connectMongoAndSchema} = require("../model/signUpModel");

const signUpControler = async (req, res) => {
  // const data = await signUpModel(req.body);
  // res.send(data);
  try {
    const data = await signUpModel(req.body);
    // console.log(data,"data")

// console.log(sim)
    // Check if the result contains a token

    // if (data._id && data._id.$oid) {
    //   data._id = data._id.$oid;
    // }
    
    if (data.token) {
      if (data._id && data._id.$oid) {
        data.id = data._id.$oid.toString();
        delete data._id;
      }
      res.status(200).json(data);
    } else {
      res.status(500).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};

const getAllUsers = async (req, res) => {
  try {
    const users = await connectMongoAndSchema.find(); // Fetch all users from the database
    res.status(200).json({data : users});

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.body._id; // Assuming the ID is passed as a parameter in the URL
    const userDetails = await connectMongoAndSchema.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: userDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user details' });
  }
};



module.exports = { signUpControler, getAllUsers, getUserDetails };

