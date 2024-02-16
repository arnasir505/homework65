import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand bg-white'>
      <div className='container justify-content-between'>
        <Link to={'/'} className='navbar-brand fw-bold'>
          My Horror Movies
        </Link>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pages/movie1'>
              Hereditary
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pages/movie2'>
              The Conjuring
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pages/movie3'>
              The Taking of Deborah Logan
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pages/movie4'>
              Sinister
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pages/movie5'>
              The Shining
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
