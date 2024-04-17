import Footer from '../components/Header/Footer';
import Header from '../components/Header/Header';
import ChittagongTurfs from '../components/Home Hero Section/ChittagongTurfs';
import Dhakaurfs from '../components/Home Hero Section/DhakaTurfs';
import FavTurfs from '../components/Home Hero Section/FavTurfs';
function ExploreTurfs() {
  return (
    <div>
      <Header />

      <FavTurfs />
      <Dhakaurfs />
      <ChittagongTurfs />
      <Footer />
    </div>
  );
}

export default ExploreTurfs;
