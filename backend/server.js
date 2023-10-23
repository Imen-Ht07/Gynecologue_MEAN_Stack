const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//pour les images BFR(Backend et Frontend Relation)
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your Angular app's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 


// Allow cross-origin requests from the Angular app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Setting up port with express js
const auth = require("./routes/auth.routes");
const patiente = require("./routes/patiente.routes");
const secretaire = require("./routes/secretaire.routes");
const carnetRoute = require('./routes/carnet.route');
const appointmentRoutes = require('./routes/appointement.route');
const ordonanceRoute = require('./routes/ordonnance.route');

const articleRoutes = require('./routes/article.route');

const consultationRoutes = require('./routes/consultation.route');

const rendezvousRoutes = require('./routes/rendez_vous.route');
const messageRoutes = require('./routes/message.route');
const ecoRoutes = require('./routes/echographie.route');
const eventsRoutes = require('./routes/events.routes');
// routes
app.use('/auth', auth);
app.use('/patiente', patiente);
app.use('/secretaire', secretaire);
app.use('/carnet', carnetRoute);
app.use('/appointment', appointmentRoutes);
app.use('/ord', ordonanceRoute);
app.use('/consultation', consultationRoutes);
app.use('/twilio', rendezvousRoutes);
app.use('/articles', articleRoutes);
app.use('/message', messageRoutes);
app.use('/eco', ecoRoutes);
app.use('/events', eventsRoutes);
// routes middleware
app.use('/uploads', express.static('uploads'));
app.use('/dicom_files', express.static('dicom_files'));
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// Connecting with mongo db
mongoose
  .connect('YOUR-DB-URL')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
 
