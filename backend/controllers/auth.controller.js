const User = require('../models/user.model');
const Patiente = require('../models/patiente.model');
const Secretaire = require('../models/secretaire.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require('../_helpers/auth.config');

exports.signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ 
      userName: req.body.userName,
      password: hashedPassword,
      role: req.body.role,
      accessToken: token
    });
    await newUser.save();
    res.status(200).json("User successfully added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      const secretaire = await Secretaire.findOne({ userName: req.body.userName });
      if (secretaire) {
        req.userRole = "secretaire";
        bcrypt.compare(req.body.password, secretaire.password, function (err, isMatch) {
          if (isMatch && !err) {
            const expirationTime = 86400; 
            var token = jwt.sign({ _id: secretaire._id, role: secretaire.role }, config.secret, {
              expiresIn: expirationTime,
            });
            console.log("token:", token);
            res.cookie("token", token, { maxAge: expirationTime * 1000 });
            res.json({
              success: true,
              token: token,
              role: "secretaire",
              user: secretaire,
            });
          } else {
            res.send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      } else {
        const patiente = await Patiente.findOne({ userName: req.body.userName });
        if (!patiente) {
          res.send({
            success: false,
            msg: "Authentication failed. User not found.",
          });
        } else {
          req.userRole = "patiente";
          bcrypt.compare(req.body.password, patiente.password, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.sign({ _id: patiente._id, role: patiente.role },config.secret, {
                  expiresIn: 86400, // 24 hours
                });
              console.log("token:", token)
              res.cookie("token", token);
              res.json({
                success: true,
                token: token,
                role: "patiente",
                user: patiente,
              });
            } else {
              res.send({
                success: false,
                msg: "Authentication failed. Wrong password.",
              });
            }
          });
        }
      }
    } else {
      req.userRole = "docteur";
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign({ _id: user._id, role: user.role },config.secret, {
            expiresIn: 86400, // 24 hours
          });
          console.log("token:", token)
          res.cookie("token", token);
          res.json({
            success: true,
            token: token,
            role: "docteur",
            user: user,
          });
        } else {
          res.send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      msg: "Something went wrong. Please try again later.",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.docteurBoard = (req, res) => {
  if (req.userRole === 'docteur') {
    res.status(200).send("Docteur Content.");
  } else {
    res.status(403).send("Access Denied.");
  }
};

exports.patienteBoard = (req, res) => {
  if (req.userRole === 'patiente') {
    res.status(200).send("Patiente Content.");
  } else {
    res.status(403).send("Access Denied.");
  }
};

exports.secretaireBoard = (req, res) => {
  if (req.userRole === 'secretaire') {
    res.status(200).send("Secretaire Content.");
  } else {
    res.status(403).send("Access Denied.");
  }
};

exports.getCurrentUserProfile = async (req, res) => {
  try {
    if (!req._id || !req.userRole) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    let user;
    switch (req.userRole) {
      case "docteur":
        user = await User.findById(req._id);
        break;
      case "patiente":
        user = await Patiente.findById(req._id);
        break;
      case "secretaire":
        user = await Secretaire.findById(req._id);
        break;
      default:
        return res.status(400).send({ message: "Invalid user role." });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
