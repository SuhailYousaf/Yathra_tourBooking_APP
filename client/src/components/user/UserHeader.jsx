import React, { useState } from 'react';
import './UserHeader.css';
import { useSelector, useDispatch } from 'react-redux';
import { MdTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { setLogout } from '../../redux/features/userrSlice';

const UserHeader = () => {
  const [active, setActive] = useState(false);
 
  const dispatch = useDispatch();
  const toggleNav = () => {
    setActive(!active);
  };
  const handleLogout = () => {
    
    dispatch(setLogout());
    
}

  const user = useSelector(state => state.userr.user);
    console.log('user', user)
    const userName = user?.UserDoc?.firstname;

  return (
    <section className="navBarSection" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
    <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>
              <MdTravelExplore className="icon" />Yathra
            </h1>
          </a>
        </div>
        <div className={`navBar ${active ? 'activeNavbar' : ''}`}>
          <ul className="navLists flex">
          {user?.UserDoc?._id ? (
            <>
            <li className="navItem">
              <a href="#" className="navLink">
                HOME     
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Packages
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Shop
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Pages
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Contact
              </a>
            </li>

            <li className="navItem">
          <button className="btn" onClick={handleLogout}>
            LogOut
          </button>
        </li>
                </>
            ): (
              <li className="navItem">
        <button className="btn">
          <a href="/login">Login</a>
        </button>
      </li>
               ) }

           

          </ul>

          <div onClick={toggleNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={toggleNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default UserHeader;
