import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./ui/Header";
import PrivateRoute from "./ui/PrivateRoute";
import AppLayout from "./ui/AppLayout";
import Inventory from "./pages/Inventory";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* manager */}
        <Route element={<PrivateRoute role="admin" />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manager" element={<AppLayout />}>
            <Route path="inventory" index element={<Inventory />} />
            <Route path="link-1" element={<div>Another Page 1</div>} />
            <Route path="link-2" element={<div>Another Page 2</div>} />
            <Route path="link-3" element={<div>Another Page 3</div>} />
          </Route>
        </Route>
        {/* chemist */}
        <Route element={<PrivateRoute role="chemist" />}>
          <Route path="/chemist-profile" element={<Profile />} />
          <Route path="/chemist" element={<div>Chemist</div>} />
        </Route>
        {/* polution controler */}
        <Route element={<PrivateRoute role="controller" />}>
          <Route path="/controller-profile" element={<Profile />} />
          <Route path="/controller" element={<div>Controller</div>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
