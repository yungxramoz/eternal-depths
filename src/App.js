import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'
import NewCharacter from './views/NewCharacter/NewCharacter'

function App() {
  return (
    <div className="rpgui-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-character" element={<NewCharacter />} />
      </Routes>
    </div>
  )
}

export default App
