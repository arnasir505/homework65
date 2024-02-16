import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { Title } from '../../types';

interface Props {
  titles: Title[];
}

const Navbar: React.FC<Props> = ({ titles }) => {
  return (
    <nav className='navbar navbar-expand bg-white'>
      <div className='container justify-content-between'>
        <Link to='/' className='navbar-brand fw-bold'>
          My Horror Movies
        </Link>
        <ul className='navbar-nav'>
          {titles.map((item) => (
            <li className='nav-item' key={item.id}>
              <NavLink className='nav-link' to={`/pages/${item.id}`}>
                {item.title}
              </NavLink>
            </li>
          ))}
          <li className='nav-item'>
            <NavLink className='nav-link' to={`/pages/admin`}>
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
