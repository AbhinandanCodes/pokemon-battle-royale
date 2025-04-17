import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import BattleRoyale from "./pages/BattleRoyale"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/battle" element={<BattleRoyale/>}/>
    </Routes>
    </>
  )
}

export default App
