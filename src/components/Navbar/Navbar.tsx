import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPages, Title } from '../../types';

const Navbar = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const fetchTitles = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiPages | null>('/pages.json');
      const pages = response.data;
      if (pages) {
        setTitles(
          Object.keys(pages).map((id) => ({
            id: id,
            title: pages[id].title,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    void fetchTitles();
  }, [fetchTitles]);

  return (
    <nav className='navbar navbar-expand bg-white'>
      <div className='container justify-content-between'>
        <Link to='/' className='navbar-brand fw-bold'>
          My Horror Movies
        </Link>
        <ul className='navbar-nav'>
          {titles.map((item) => (
            <li className='nav-item'>
              <NavLink className='nav-link' to={`/pages/${item.id}`}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
