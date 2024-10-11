import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import AllBooks from './pages/AllBooks';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './Components/ViewBookDetails/ViewBookDetails';
import Favorites from './Components/Profile/Favorites';
import UserOrderHistory from './Components/Profile/UserOrderHistory';
import Settings from './Components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBooks from './pages/AddBooks';
import { authActions } from './store/auth';
import UpdateBook from './pages/UpdateBook';
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div className="minh-screen bg-zinc-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={role === 'user' ? <Favorites /> : <AllOrders />} />
          {role === 'admin' && (
            <Route path="addbook" element={<AddBooks />} />
          )}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path='/updatebook/:id' element={<UpdateBook />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
