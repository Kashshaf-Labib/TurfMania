import { useEffect, useState } from 'react';
import TurfCards from '../TurfCards';

const ChittagongTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/turfs/Chittagong')
      .then(res => res.json())
      .then(data => setTurfs(data));
  }, []);
  return (
    <div>
      <TurfCards turfs={turfs} headline="Turfs In Chittagong" />
    </div>
  );
};

export default ChittagongTurfs;
