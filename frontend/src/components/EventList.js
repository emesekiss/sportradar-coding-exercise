import { useEffect, useState } from 'react';
import { format } from 'date-fns';

function EventList() {
  const [events, setEvents] = useState([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter) {
      async function filterEvents() {
        const response = await fetch(`http://localhost:3001/${filter}`);
        const filteredEventsData = await response.json();
        setEvents(filteredEventsData);
      }
      filterEvents();
    } else {
      async function getEvents() {
        const response = await fetch(`http://localhost:3001`);
        const allEventsData = await response.json();
        setEvents(allEventsData);
      }
      getEvents();
    }
  }, [filter]);

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
        <option value="Ice Hockey">Ice Hockey</option>
        <option value="Basketball">Basketball</option>
        <option value="Handball">Handball</option>
        <option value="Volleyball">Volleyball</option>
        <option value="Football">Football</option>
        <option value="Badminton">Badminton</option>
      </select>

      <ol>
        {events.map((item) => (
          <li key={item.id}>
            <div>
              <p>{`${format(
                new Date(item.datetime),
                'eee., dd.MM.yyyy, HH:mm,',
              )} ${item.sport}, ${item.details} `}</p>
              <button
                onClick={async () => {
                  const answer = window.confirm(
                    `Do you really want to delete this item from your list?`,
                  );

                  if (answer === true) {
                    await fetch(`http://localhost:3001/events/${item.id}`, {
                      method: 'DELETE',
                    });
                    window.location.reload();

                    // This is just a fast way of refreshing the information
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default EventList;
