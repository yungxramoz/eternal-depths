import { Route, Routes } from 'react-router-dom'
import './App.css'
import ROUTE from './constants/routes'
import GameStateRoute from './utils/GameStateRoute'
import Dungeon from './views/Dungeon/Dungeon'
import Home from './views/Home/Home'
import NewCharacter from './views/NewCharacter/NewCharacter'

function App() {
  return (
    <div className="rpgui-content">
      <Routes>
        {/* <GameStateRoute> */}
        <Route element={<GameStateRoute />}>
          <Route path={ROUTE.HOME} element={<Home />} />
          <Route path={ROUTE.NEW_CHARACTER} element={<NewCharacter />} />
          <Route path={ROUTE.DUNGEON} element={<Dungeon />} />
        </Route>
        {/* </GameStateRoute> */}
      </Routes>
    </div>
  )
}

export default App
