import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, About, UserList, Profile, Inventory, PageNotFound, Chemical, Dashboard } from './pages';
import { Header, PrivateRoute, AppLayout, Map } from './ui';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* manager */}
        <Route element={<PrivateRoute role="manager" />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/manager/board" element={<Board />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manager" element={<AppLayout />}>
            <Route path="inventory" index element={<Inventory />} />
            <Route path="users" element={<UserList />} />
            <Route path="chemical" element={<Chemical />} />
            <Route path="map" element={<Map />} />
          </Route>
        </Route>
        {/* chemist */}
        <Route element={<PrivateRoute role="chemist" />}>
          <Route path="/chemist/board" element={<Board />} />
          <Route path="/chemist-profile" element={<Profile />} />
          <Route path="/chemist" element={<AppLayout />}>
            <Route path="inventory" index element={<Inventory />} />
            <Route path="chemical" element={<Chemical />} />
            <Route path="map" element={<Map />} />
          </Route>
        </Route>

        {/* team leader */}
        <Route element={<PrivateRoute role="tl" />}>
          <Route path="/tl/board" element={<Board />} />
          <Route path="/tl-profile" element={<Profile />} />
          <Route path="/tl" element={<div>Team leader</div>} />
          <Route path="/tl/map" element={<Map />} />
        </Route>
        {/* purchacer */}
        <Route element={<PrivateRoute role="purchacer" />}>
          <Route path="/purchacer/board" element={<Board />} />
          <Route path="/purchacer-profile" element={<Profile />} />
          <Route path="/purchacer" element={<div>purchacer</div>} />
          <Route path="/purchacer/map" element={<Map />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
