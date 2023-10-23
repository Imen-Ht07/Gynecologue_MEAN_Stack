const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Patiente = require('../models/patiente.model');
const PasswordResetToken = require('../models/resetpass.model');
module.exports = {
    //
async ResetPassword(req, res) {
    if (!req.body.PatienteName) {
    return res
    .status(500)
    .json({ message: 'Patiente name is required' });
    }
    const patiente = await Patiente.findOne({
    PatienteName:req.body.PatienteName
    });
    if (!patiente) {
    return res
    .status(409)
    .json({ message: 'Patiente name does not exist' });
    }
    var resettoken = new PasswordResetToken({ patienteId: patiente._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    PasswordResetToken.find({ patienteId: patiente._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
    res.status(200).json({ message: 'Reset Password successfully.' })
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        Patiente: 'imenmanou969@gmail.com',
        pass: 'nqavlptkuyhsuwja'
      }
    });
    var mailOptions = {
    to: patiente.email,
    from: 'imenmanou969@gmail.com',
    subject: 'Gynécologue Password Reset',
    text: 'Vous recevez cela parce que vous (ou quelqu’un d’autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n' +
    'cliquer sur le lien ou copier le lien dans votre navigateur pour continuer:\n\n' +
    'http://localhost:4200/response/' + resettoken.resettoken + '\n\n' +
    'Si vous ne l’avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }})
    })
    },

    // verify password reset link
    async ValidPasswordToken(req, res){
      try {
        const user = await Patiente.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });
    
        const token = await PasswordResetToken.findOne({
          patienteId: req.body.patienteId,
          resettoken: req.params.resettoken,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });
    
        res.status(200).send("Valid Url");
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    },
    //  set new password
  async NewPassword(req, res) {
		const user = await Patiente.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await PasswordResetToken.findOne({
      patienteId: req.body.patienteId,
      resettoken: req.params.resettoken,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user){
    return res
              .status(409)
              .json({ message: 'Patiente does not exist' });
          }
          return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              return res
                .status(400)
                .json({ message: 'Error hashing password' });
            }
            user.password = hash;
            user.save(function (err) {
              if (err) {
                return res
                  .status(400)
                  .json({ message: 'Password can not reset.' });
              } else {
                token.remove();
                return res
                  .status(201)
                  .json({ message: 'Password reset successfully' });
              }
  
            });
          });
        },

      }