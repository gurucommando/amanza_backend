const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const signUpSchema = mongoose.Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, strict: true }
);

const connectMongoAndSchema = mongoose.model("user", signUpSchema);

const signUpModel = async (obj) => {
  const { name, email, password } = obj;
  const errors = {};
  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }

  const requiredFields = Object.keys(errors);

  if (requiredFields.length > 0) {
    const errorMessage = requiredFields
      .map(
        (field) =>
          `${field.charAt(0).toLowerCase() + field.slice(1)} is required`
      )
      .join(", ");
    return { status: 400, message: "Validation failed", errors: errorMessage };
  }

 

  try {
    const data = await connectMongoAndSchema.create(obj);
    const token = jwt.sign({ userId: data._id }, 'dd', {
      expiresIn: '1h',
    });
    return { message: "Successfully Registered", data: data ,token: token };
  } catch (error) {
    return { status: 500, message: "Failed to create user" };
  }
};

module.exports = {signUpModel,connectMongoAndSchema};
