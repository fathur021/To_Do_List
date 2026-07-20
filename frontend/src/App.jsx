import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import To_do_list from "./pages/To_do_list";
const App = () => {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<To_do_list/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App