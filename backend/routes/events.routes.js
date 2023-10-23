const express = require('express');
const eventsRoutes = express.Router();
const CalendarEvent = require('../models/event');

// Get all calendar events
eventsRoutes.get('/', (req, res) => {
  CalendarEvent.find({}, (err, events) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving events' });
    } else {
      res.status(200).json(events);
    }
  });
});

// Create a new calendar event
eventsRoutes.post('/', (req, res) => {
  const eventData = req.body;
  const newEvent = new CalendarEvent(eventData);
  newEvent.save((err, event) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating event' });
    } else {
      res.status(200).json(event);
    }
  });
});

// Update an existing calendar event
eventsRoutes.put('/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const eventData = req.body;
  CalendarEvent.findByIdAndUpdate(
    eventId,
    eventData,
    { new: true },
    (err, event) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating event' });
      } else {
        res.status(200).json(event);
      }
    }
  );
});

eventsRoutes.delete('/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  CalendarEvent.findByIdAndDelete(eventId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting event' });
    } else {
      res.status(200).json({ message: 'Event deleted successfully' });
    }
  });
});


module.exports = eventsRoutes;