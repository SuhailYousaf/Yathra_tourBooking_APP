import React, { useEffect } from 'react';
import './App.css';
import './styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route,  Router  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { setAgent } from './redux/features/authSlice';
// import AgentHome from './pages/agent/AgentHome';
// import AgentLogin from './pages/agent/AgentLogin';
// import AgentRegister from './pages/agent/AgentRegister';
// import AgentLayout from './components/agent/AgentLayout';
// import AddTour from './pages/agent/AddTour';
// import UserHome from './pages/user/UserHome';

import UserLayout from './components/user/UserLayout';
import UserRegister from './pages/user/UserRegister';
import UserLogin from './pages/user/UserLogin';
import SingleTour from './pages/user/SingleTour';
import Layout from './components/user/Layout';

import AdminLogin from './pages/admin/AdminLogin'
import { setAdmin } from './redux/features/adminSlice'
import AddProduct from './pages/admin/products/AddProduct';
import Navbar from './components/admin/Navbar/Navbar';
import Footer from './components/admin/Footer/Footer';
import Menu from './components/admin/Menu/Menu';
import { Outlet } from 'react-router-dom';
import AdminHome from './pages/admin/home/Home';
import AdminUsers from './pages/admin/users/Users';
import AdminProducts from './pages/admin/products/Products';

function App() {
  const dispatch = useDispatch();
  const agent = JSON.parse(localStorage.getItem('profile'));
  const admin = JSON.parse(localStorage.getItem("adminprofile"))

  useEffect(() => {
    dispatch(setAdmin(admin))
  }, [])

  


  const AdminLayout = () =>{

    
       
    return (     
      <div className="AdminMain">
        <Navbar />
        <div className="AdminContainer">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
              <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };


  

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          

          <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="" element={<AdminHome />} />
          <Route path="addProduct" element={<AddProduct/>} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="adminlogin" element={<AdminLogin />} />
          


        <Route path="" element={<Layout/>} >
        <Route path="/" element={<UserLayout />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/getTour/:id" element={<SingleTour/>} />
        </Route>
           
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
