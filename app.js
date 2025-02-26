import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Items from "./pages/Items";
import UploadItem from "./pages/UploadItem";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/items">Items</Link>
        <Link to="/upload">Upload Item</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<Items />} />
        <Route path="/upload" element={<UploadItem />} />
      </Routes>
    </Router>
  );
}

export default App;
