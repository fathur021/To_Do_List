import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import To_do_list from "./pages/To_do_list";
import DetailTugas from "./pages/DetailTugas";
import Home from "./pages/Home";
import UserLayout from "./layouts/UserLayout";
const App = () => {
  return (
    <BrowserRouter >
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path={"/"} element={<Home/>} />
      </Route>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App 