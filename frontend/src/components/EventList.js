import { useEffect, useState } from 'react';
import { format } from 'date-fns';

function EventList({ sports }) {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      async function filterEvents() {
        const response = await fetch(`http://localhost:3001/${filter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const filteredEventsData = await response.json();
        setEvents(filteredEventsData);
      }
      filterEvents();
    } else {
      async function getEvents() {
        const response = await fetch(`http://localhost:3001/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const allEventsData = await response.json();
        setEvents(allEventsData);
      }
      getEvents();
    }
  }, [filter]);

  const handleDelete = async (item) => {
    const answer = window.confirm(
      `Do you really want to delete the event: ${item.name} on ${format(
        new Date(item.datetime),
        'eee., dd.MM.yyyy, HH:mm,',
      )} from your list?`,
    );

    if (answer === true) {
      console.log(item);
      await fetch(`http://localhost:3001/events/${item.id}`, {
        method: 'DELETE',
      });

      // This is just a fast way of refreshing the information
      window.location.reload();
    }
  };

  return (
    <div>
      <h3>All Events</h3>
      <h4>Filter:</h4>
      <select
        name="sport"
        id="sport-filter"
        onChange={(e) => setFilter(e.currentTarget.value)}
      >
        <option value="">All</option>
        {sports.map((sport) => (
          <option key={`sport-filter-${sport.id}`} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>

      <ol>
        {events.map((event) => (
          <li key={`event-${event.id}`}>
            <div>
              <p>{`${format(
                new Date(event.datetime),
                'eee., dd.MM.yyyy, HH:mm,',
              )} ${event.name}, ${event.details} `}</p>
              <button onClick={() => handleDelete(event)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default EventList;
