import { useState } from 'react';

export default function EventForm() {
  const [dateTime, setDateTime] = useState('');
  const [sport, setSport] = useState('');
  const [details, setDetails] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await fetch('http://localhost:3001/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            datetime: dateTime,
            sport: sport,
            details: details,
          }),
        });
        window.location.reload();
      }}
    >
      <div>
        <h3>New Event</h3>

        <input
          title="datetime"
          type="datetime-local"
          name="datetime"
          value={dateTime}
          min="2021-01-20"
          max="2200-06-14"
          onChange={(e) => setDateTime(e.currentTarget.value)}
          required
        />
        <label for="sport-select">Choose a sport:</label>

        <select
          name="sport"
          id="sport-select"
          onChange={(e) => setSport(e.currentTarget.value)}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="Ice Hockey">Ice Hockey</option>
          <option value="Basketball">Basketball</option>
          <option value="Handball">Handball</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Football">Football</option>
          <option value="Badminton">Badminton</option>
        </select>

        <input
          title="details"
          value={details}
          type="details"
          onChange={(e) => setDetails(e.currentTarget.value)}
          placeholder="Details"
          required
        />
        <button>Add</button>
      </div>
    </form>
  );
}