import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

export async function getEvents() {
  const events = await sql`
    SELECT id, datetime, sport, details FROM events ORDER BY datetime;
  `;
  console.log(events);
  return events.map((u) => camelcaseKeys(u));
}

export async function addEvent(data) {
  const events = await sql`
    INSERT INTO events
      (datetime, sport, details)
    VALUES
      (${data.datetime},${data.sport}, ${data.details})
    RETURNING *;
  `;

  return events.map((u) => camelcaseKeys(u))[0];
}

export async function deleteEvent(id) {
  const deletedEvent = await sql`
    DELETE FROM events
      WHERE id = ${id}
      ;
  `;

  return deletedEvent.map((u) => camelcaseKeys(u));
}

export async function filterEvents(filter) {
  const filteredEvents = await sql`
  SELECT *
FROM events
WHERE sport =${filter}`;
  return filteredEvents.map((u) => camelcaseKeys(u));
}
