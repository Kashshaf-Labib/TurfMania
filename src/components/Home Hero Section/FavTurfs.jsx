import { useEffect, useState } from 'react';
import TurfCards from '../TurfCards';

const FavTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/all-turfs')
      .then(res => res.json())
      .then(data => setTurfs(data));
  }, []);
  return (
    <div>
      <TurfCards turfs={turfs} headline="Top Rated" />
    </div>
  );
};

export default FavTurfs;
