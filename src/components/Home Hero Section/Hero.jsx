import { Link } from 'react-router-dom';
import arrow_btn from '../../assets/arrow_btn.png';
import pause_icon from '../../assets/pause_icon.png';
import play_icon from '../../assets/play_icon.png';
import './Hero.css';

const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
  handleLogout, // Function to handle logout action
}) => {
  return (
    <div className="hero">
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <Link to="/exploreturfs" className="hero-explore">
        <p>Explore Turfs</p>
        <img src={arrow_btn} alt="" />
      </Link>
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li
            onClick={() => {
              setHeroCount(0);
            }}
            className={heroCount === 0 ? 'hero-dot orange' : 'hero-dot'}
          ></li>
          <li
            onClick={() => {
              setHeroCount(1);
            }}
            className={heroCount === 1 ? 'hero-dot orange' : 'hero-dot'}
          ></li>
          <li
            onClick={() => {
              setHeroCount(2);
            }}
            className={heroCount === 2 ? 'hero-dot orange' : 'hero-dot'}
          ></li>
        </ul>
        <div className="hero-play">
          <img
            onClick={() => {
              setPlayStatus(!playStatus);
            }}
            src={playStatus ? pause_icon : play_icon}
            alt=""
          />
          <p>See the video</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
