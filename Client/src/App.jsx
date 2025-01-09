import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { HomeLogin } from "./pages/HomeLogin";
import { PostAJob } from "./pages/PostAJob";
import { useAuth } from "./store/auth"; // Import the auth hook

const App = () => {
  const { isLoggedIn } = useAuth(); // Check login status

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Dynamically route to HomeLogin if logged in, else Home */}
        <Route path="/" element={isLoggedIn ? <HomeLogin /> : <Home />} />
        <Route path="/register" element={isLoggedIn ? <PostAJob /> : <Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? <HomeLogin /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/postajob"
          element={
            isLoggedIn ? <PostAJob /> : <Navigate to="/register" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
