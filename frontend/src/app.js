import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

function App() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    async function getSports() {
      const response = await fetch(`http://localhost:3001/sports`);
      const allSportsData = await response.json();
      setSports(allSportsData);
    }
    getSports();
  }, []);
  return (
    <div>
      <h1>Sportradar Challenge - Calendar</h1>
      <EventForm sports={sports} />
      <EventList sports={sports} />
    </div>
  );
}

export default App;
