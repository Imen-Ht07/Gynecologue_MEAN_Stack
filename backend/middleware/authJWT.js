const jwt = require("jsonwebtoken");
const config = require("../_helpers/auth.config.js");
const User = require('../models/user.model.js');
const Patiente = require('../models/patiente.model.js');
const Secretaire = require('../models/secretaire.model.js');

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req._id = decoded._id;
    req.userRole = decoded.role; // Attach the user role to the request object
    next();
  });
};


const isDocteur= (req, res, next) => {
  User.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.find(
      {
        _id: { $in: user.role},
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
          if (role === "docteur") {
            next();
            return;
        }

        res.status(403).send({ message: "Require Docteur Role!" });
        return;
      }
    );
  });
};

const isSecretaire = (req, res, next) => {
  Secretaire.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

   Secretaire.find(
      {
        _id: { $in: user.role},
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
          if (role === "secretaire") {
            next();
            return;
        }

        res.status(403).send({ message: "Require Secretaire Role!" });
        return;
      }
    );
  });
};

const isPatiente = (req, res, next) => {
    Patiente.findById(req._id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }  
      Patiente.find(
        {
          _id: { $in: user.role},
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
            if (role === "patiente") {
              next();
              return;
            }
          res.status(403).send({ message: "Require Patiente Role!" });
          return;
        }
      );
    });
  };
 
const authJwt = {
  verifyToken,
  isDocteur,
  isSecretaire,
  isPatiente,
};


module.exports = authJwt;