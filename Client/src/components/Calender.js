import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Button,
} from '@mui/material';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Helper function to group events by date
const groupEventsByDate = (events) => {
  const grouped = {};
  events.forEach((event) => {
    const date = new Date(event.datetime).toDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(event);
  });
  return grouped;
};

// Helper function to get the days of the current month
const getDaysInMonth = (month, year) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill the empty days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Fill the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

const Calendar = ({ events }) => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  const groupedEvents = groupEventsByDate(events);
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: '1000px',
        margin: '0 auto',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        boxShadow: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button onClick={handlePrevMonth}>Previous</Button>
        <Typography variant="h6" textAlign="center">
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
        <Button onClick={handleNextMonth}>Next</Button>
      </Box>
      <Grid container spacing={1}>
        {daysOfWeek.map((day, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        {daysInMonth.map((date, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '8px',
                p: 1,
                minHeight: '100px',
                backgroundColor: date ? '#f5f5f5' : 'transparent',
              }}
            >
              {date && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {date.getDate()}
                  </Typography>
                  {groupedEvents[date.toDateString()]?.map((event) => (
                    <Card
                      key={event._id}
                      sx={{
                        backgroundColor: event.color || '#e3f2fd',
                        boxShadow: 2,
                        mb: 1,
                      }}
                    >
                      <CardContent sx={{ p: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {event.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(event.datetime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                        {event.link && (
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                              textDecoration: 'underline',
                              wordBreak: 'break-word',
                            }}
                          >
                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                              {event.link}
                            </a>
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
