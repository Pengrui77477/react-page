import { unstable_HistoryRouter as HistoryRouter , Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
// import Login from './pages/Login';
import Login from '@/pages/Login'
import 'antd/dist/reset.css';
import AuthComponent from '@/components/AuthRoute'
import Public from './pages/Public';
import Article from './pages/Article';
import Home from './pages/Home';
import { history } from './utils/history';

function App() {
  return (
    <HistoryRouter history={history}>
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
            <Route path='/publish' element={<Public />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>

        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
