import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
// import Login from './pages/Login';
import Login from '@/pages/Login'
import 'antd/dist/reset.css';
import AuthComponent from '@/components/AuthRoute'
import Public from './pages/Public';
import Article from './pages/Article';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          { /** path component */}
          <Route path='/' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            <Route index element={<Home />}></Route>
            <Route path='/article' element={<Article />}></Route>
            <Route path='/public' element={<Public />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
