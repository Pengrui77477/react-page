import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
// import Login from './pages/Login';
import Login from '@/pages/Login'
import 'antd/dist/reset.css';
import AuthComponent from '@/components/AuthRoute'

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
          }></Route>
          <Route path='/login' element={<Login />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
