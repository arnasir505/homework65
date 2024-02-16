import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import DynamicPage from './components/DynamicPage/DynamicPage';
import Home from './containers/Home/Home';
import PageEditor from './components/PageEditor/PageEditor';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pages/:id' element={<DynamicPage />} />
        <Route path='/pages/admin' element={<PageEditor />} />
        <Route
          path='*'
          element={<h1 className='text-center mt-5'>Not Found!</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
