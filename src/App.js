import { Route, Routes } from 'react-router-dom'
import './App.css'
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
          <Route path="/" element={<Home />} />
          <Route path="/new-character" element={<NewCharacter />} />
          <Route path="/dungeon" element={<Dungeon />} />
        </Route>
        {/* </GameStateRoute> */}
      </Routes>
    </div>
  )
}

export default App
