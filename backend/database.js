import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

export async function getEvents() {
  const events = await sql`
    SELECT events.id, events.datetime, events.details, sports.name, events.sport_id FROM events, sports
    WHERE sports.id = events.sport_id ORDER BY datetime;
  `;

  return events.map((u) => camelcaseKeys(u));
}

export async function getSports() {
  const sports = await sql`
  SELECT * FROM sports
`;

  return sports.map((u) => camelcaseKeys(u));
}

export async function addEvent(data) {
  const events = await sql`
    INSERT INTO events
      (datetime, sport_id, details)
    VALUES
      (${data.datetime},${data.sport_id}, ${data.details})
    RETURNING *;
  `;

  return events.map((u) => camelcaseKeys(u))[0];
}

export async function deleteEvent(id) {
  const deletedEvent = await sql`
    DELETE FROM events
    WHERE id = ${id};
  `;

  return deletedEvent.map((u) => camelcaseKeys(u));
}

export async function filterEvents(filter) {
  const filteredEvents = await sql`
  SELECT * FROM events, sports
  WHERE events.sport_id = sports.id 
  AND sports.id =${filter}`;

  return filteredEvents.map((u) => camelcaseKeys(u));
}
