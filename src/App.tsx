import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import GeneralPage from './components/GeneralPage/GeneralPage';
import Home from './containers/Home/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pages' element={<Home />} />
        <Route path='/pages/:id' element={<GeneralPage />} />
        <Route
          path='*'
          element={<h1 className='text-center mt-5'>Not Found!</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
