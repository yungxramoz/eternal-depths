import { Route, Routes } from 'react-router-dom'
import './App.css'
import ROUTE from './constants/routes'
import GameStateRoute from './route/GameStateRoute'
import Dungeon from './views/Dungeon/Dungeon'
import Home from './views/Home/Home'
import Leaderboard from './views/Leaderboard/Leaderboard'
import NewCharacter from './views/NewCharacter/NewCharacter'
import Won from './views/Won/Won'

function App() {
  return (
    <div className="rpgui-content">
      <Routes>
        <Route element={<GameStateRoute />}>
          <Route path={ROUTE.HOME} element={<Home />} />
          <Route path={ROUTE.NEW_CHARACTER} element={<NewCharacter />} />
          <Route path={ROUTE.DUNGEON} element={<Dungeon />} />
          <Route path={ROUTE.LEADERBOARD} element={<Leaderboard />} />
          <Route path={ROUTE.GAME_WON} element={<Won />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
