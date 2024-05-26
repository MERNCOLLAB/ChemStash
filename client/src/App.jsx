import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import AppLayout from "./components/AppLayout";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="inventory" index element={<Inventory />} />
            <Route path="/link-1" element={<div>Another Page 1</div>} />
            <Route path="/link-2" element={<div>Another Page 2</div>} />
            <Route path="/link-3" element={<div>Another Page 3</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
