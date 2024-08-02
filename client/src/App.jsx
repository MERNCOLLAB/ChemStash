import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, About, UserList, Profile, Inventory, PageNotFound, Dashboard } from './pages';
import { PrivateRoute, AppLayout, Map } from './ui';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* manager */}
        <Route element={<PrivateRoute role="manager" />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manager" element={<AppLayout />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="board" element={<Board />} />
            <Route path="users" element={<UserList />} />
            <Route path="map" element={<Map />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        {/* chemist */}
        <Route element={<PrivateRoute role="chemist" />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chemist" element={<AppLayout />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="board" element={<Board />} />
            <Route path="map" element={<Map />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* team leader */}
        <Route element={<PrivateRoute role="tl" />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tl" element={<AppLayout />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="board" element={<Board />} />
            <Route path="users" element={<UserList />} />
            <Route path="map" element={<Map />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
