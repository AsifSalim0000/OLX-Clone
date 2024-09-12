import React from 'react';
import { Link } from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../firebase';

function Header() {
  const { user } = useAuth();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
       
        <span className='fw-bolder'> {user ? user.displayName : ""}</span>
            
      
        <div className="loginPage">
          {user ? (
            <>
              <span onClick={logout}>Logout</span>
            </>
          ) : (
            <Link to={'/login'}>
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <Link to={'/create'}>
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
