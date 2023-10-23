const Appointment = require('../models/appointment');
const sms = require('../models/twilio');
const twilio = require('twilio');
const accountSid = 'AC18d59b9ac1675efe84d5e5f993cb9281';
const authToken = '4fb4032e6a063f0d6eae2597deb90ad5';

exports.rendezVous = async (req, res) => {
  const { nom, prenom } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const appointment = await Appointment.findOne({
    nom: nom,
    prenomP: prenom,
  });
  if (!appointment) {
    return res.status(409).json({ message: 'Patient name does not exist' });
  }

  const num = '+216' + appointment.numt;
  const twilioClient = twilio(accountSid, authToken);
  const messageBody = req.body.messageBody;
  const messageParams = {
    body: messageBody,
    from: '+12706122727',
    to: num,
  };

  twilioClient.messages
    .create(messageParams)
    .then((message) => {
      console.log(`SMS message sent with message ID ${message.sid}`);

      // Create a new sms document in the database
      const newSms = new sms({
        appointmentId: appointment._id,
        nom: appointment.nom,
        prenom: appointment.prenom,
        numt: num,
        messageBody: messageBody,
      });

      newSms.save()
        .then((savedSms) => {
          console.log('SMS document saved:', savedSms);

          // Update the status of the appointment to 'valid'
          appointment.status = 'valid';
          appointment.save()
            .then(() => {
              console.log('Appointment status updated to valid');
            })
            .catch((error) => {
              console.error('Failed to update appointment status:', error);
            });
        })
        .catch((error) => {
          console.error('Failed to save SMS document:', error);
        });
    })
    .catch((error) =>
      console.error(`Failed to send SMS message: ${error.message}`)
    );
};
