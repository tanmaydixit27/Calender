const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, datetime, tag, color, link } = req.body;
  const userId = req.user.userId;

  try {
    // Check for overlapping events
    const overlappingEvent = await Event.findOne({
      userId,
      datetime,
    });

    if (overlappingEvent) {
      return res.status(400).json({ error: 'Time slot occupied' });
    }

    // Create new event with additional fields
    const event = new Event({ userId, name, datetime, tag, color, link });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

exports.listEvents = async (req, res) => {
  const userId = req.user.userId;
  const { sort, filter, limit } = req.query;

  try {
    const query = Event.find({ userId });
    if (filter) query.where('tag').equals(filter);
    if (sort) query.sort(sort);
    if (limit) query.limit(parseInt(limit));

    const events = await query.exec();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};
