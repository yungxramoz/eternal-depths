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
        <Route path="/" element={<Home />} />
        <Route path="/new-character" element={<NewCharacter />} />
        <Route
          path="/dungeon"
          element={
            <GameStateRoute>
              <Dungeon />
            </GameStateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
