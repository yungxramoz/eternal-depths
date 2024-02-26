import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'
import NewCharacter from './views/NewCharacter/NewCharacter'
import store from './state/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="rpgui-content">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-character" element={<NewCharacter />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
