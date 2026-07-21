import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import To_do_list from "./pages/To_do_list";
import DetailTugas from "./pages/DetailTugas";
const App = () => {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<To_do_list/>}/>
      <Route path="detail/:id" element={<DetailTugas/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App 