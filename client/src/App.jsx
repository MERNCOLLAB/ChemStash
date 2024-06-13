import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, SignIn, About, UserList, Profile, Inventory, PageNotFound, Chemical } from './pages';
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
        <Route element={<PrivateRoute role="admin" />}>
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/admin/board" element={<Board />} />
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
          <Route path="/chemist" element={<div>Chemist</div>} />
          <Route path="/chemist/map" element={<Map />} />
        </Route>
        {/* polution controler */}
        <Route element={<PrivateRoute role="controller" />}>
          <Route path="/controller/board" element={<Board />} />
          <Route path="/controller-profile" element={<Profile />} />
          <Route path="/controller" element={<div>Controller</div>} />
          <Route path="/controller/map" element={<Map />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
