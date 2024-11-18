import React, { useState } from 'react';
import Calender from '../components/Calender';
import EventForm from '../components/EventForm';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  return (
    <div>
      <Calender events={events} />
      <EventForm setEvents={setEvents} />
    </div>
  );
};

export default Dashboard;
