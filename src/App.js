import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'

function App() {
  return (
    <div className="rpgui-content">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
