import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    isEmailVerified: {
      type: Boolean,
      default: false, // Nouveaux utilisateurs n'ont pas encore vérifié leur e-mail
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
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false }
);

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
    throw Error("Tous les champs doivent être remplis");
  }
  if (!validator.isEmail(email)) {
    throw Error("L'adresse email n'est pas valide");
  }
  if (
    !validator.isStrongPassword(password, {
      minSymbols: 0,
      minLength: 8,
      minUppercase: 0,
    })
  ) {
    throw Error("Le mot de passe est trop faible");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("L'adresse email est déjà utilisée");
  }

  const userNameExists = await this.findOne({ userName });
  if (userNameExists) {
    throw Error("Le nom d'utilisateur est déjà utilisé");
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
    throw Error("Tous les champs doivent être remplis");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Adresse email incorrecte");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Mot de passe incorrect");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
