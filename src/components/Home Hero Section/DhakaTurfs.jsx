import { useEffect, useState } from 'react';
import TurfCards from '../TurfCards';

const Dhakaurfs = () => {
  const [turfs, setTurfs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/turfs/Dhaka')
      .then(res => res.json())
      .then(data => setTurfs(data));
  }, []);
  return (
    <div>
      <TurfCards turfs={turfs} headline="Turfs In Dhaka" />
    </div>
  );
};

export default Dhakaurfs;
