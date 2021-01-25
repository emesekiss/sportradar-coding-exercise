import { useEffect, useState } from 'react';
import { format } from 'date-fns';

function EventList() {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function getSports() {
      const response = await fetch(`http://localhost:3001/sports`);
      const allSportsData = await response.json();
      setSports(allSportsData);
    }
    getSports();
  }, []);

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
        {sports.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>

      <ol>
        {events.map((item) => (
          <li key={item.id}>
            <div>
              <p>{`${format(
                new Date(item.datetime),
                'eee., dd.MM.yyyy, HH:mm,',
              )} ${item.name}, ${item.details} `}</p>

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
