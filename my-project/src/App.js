import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MangaItem from "./conponents/page/MangaItem";
import HomePage from "./conponents/HomePage";
import Items from "./conponents/page/Items";
import LogIn from "./conponents/logIn_signUp/LogIn";
import Register from "./conponents/logIn_signUp/Register";
import Admin from "./conponents/logIn_signUp/Admin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manga/:id" element={<MangaItem />} />
          <Route path="/manga/:id/items" element={<Items />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
