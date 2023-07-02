import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
  userName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  quizzSystemeSolaire: {
    type: Number,
  },
  quizzGalaxies: {
    type: Number,
  },
  quizzPhenomenesObservables: {
    type: Number,
  },
  quizzAstronautes: {
    type: Number,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  isAdmin,
  userName,
  profilePicture,
  quizzSystemeSolaire,
  quizzGalaxies,
  quizzPhenomenesObservables,
  quizzAstronautes
) {
  // validation
  if (!(email || password)) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (
    !validator.isStrongPassword(password, {
      minSymbols: 0,
      minLengh: 8,
      minUppercase: 0,
    })
  ) {
    throw Error("Password is too weak");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    isAdmin,
    userName,
    profilePicture,
    quizzSystemeSolaire,
    quizzGalaxies,
    quizzPhenomenesObservables,
    quizzAstronautes,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!(email || password)) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
