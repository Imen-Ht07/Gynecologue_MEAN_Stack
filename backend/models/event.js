const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
