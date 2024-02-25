import { Link } from 'react-router-dom'
import RpgButton from '../../components/atoms/RpgButton/RpgButton'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../components/templates/RpgSeperator/RpgSeparator'
import './Home.css'

import bgImg from '../../assets/images/ui/home.png'

function Home() {
  return (
    <RpgContainer fullPage className="home-container" bgImg={bgImg}>
      <h1 className="main-title">Eternal Depths</h1>
      <RpgSeparator />
      <div className="button-menu">
        <Link to="/new-character">
          <RpgButton text="New Character" />
        </Link>
        <Link to="/leaderboard">
          <RpgButton text="Leaderboard" />
        </Link>
      </div>
    </RpgContainer>
  )
}

export default Home
