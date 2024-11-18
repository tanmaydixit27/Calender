import React, { useState } from 'react';
import { createEvent } from '../services/api';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

const EventForm = ({ setEvents }) => {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [link, setLink] = useState('');
  const [color, setColor] = useState('#e3f2fd'); // Default color
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const colors = [
    { label: 'Blue', value: '#e3f2fd' },
    { label: 'Green', value: '#c8e6c9' },
    { label: 'Yellow', value: '#fff9c4' },
    { label: 'Pink', value: '#f8bbd0' },
    { label: 'Orange', value: '#ff9933' },
    { label: 'Red', value: '#ff3333' },
    { label: 'Purple', value: '#f333ff' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const event = await createEvent({ name, datetime, link, color });
      setEvents((prev) => [...prev, event]);
      setSuccessMessage('Event created successfully!');
      setName('');
      setDatetime('');
      setLink('');
      setColor('#e3f2fd');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Date & Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
        <TextField
          label="Link (optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <TextField
          select
          label="Event Color"
          variant="outlined"
          fullWidth
          margin="normal"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        >
          {colors.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Event
        </Button>
      </form>
      {successMessage && <Typography color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}
      {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default EventForm;
