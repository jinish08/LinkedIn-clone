import Login from "./pages/Login";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext";
import Network from "./pages/Network";
import Messaging from "./pages/Messaging";

function App() {

  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user?<Home />:<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/network" element={<Network />} />
        <Route path="/messaging" element={<Messaging />} />
        {/* <Route path="/signup" element={user?<Navigate to="/" />:<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
