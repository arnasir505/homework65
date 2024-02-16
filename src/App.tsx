import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import DynamicPage from './components/DynamicPage/DynamicPage';
import Home from './containers/Home/Home';
import PageEditor from './components/PageEditor/PageEditor';
import { useState, useCallback, useEffect } from 'react';
import axiosApi from './axiosApi';
import { Title, ApiPages } from './types';
import './App.css';

function App() {
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
    <div className='wrap'>
      <Navbar titles={titles} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pages/:id' element={<DynamicPage />} />
        <Route path='/pages/admin' element={<PageEditor titles={titles} />} />
        <Route
          path='*'
          element={<h1 className='text-center mt-5'>Not Found!</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
