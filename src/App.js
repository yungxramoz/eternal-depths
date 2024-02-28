import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import store from './state/store'
import Dungeon from './views/Dungeon/Dungeon'
import Home from './views/Home/Home'
import NewCharacter from './views/NewCharacter/NewCharacter'

function App() {
  return (
    <div className="rpgui-content">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-character" element={<NewCharacter />} />
          <Route path="/dungeon" element={<Dungeon />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
