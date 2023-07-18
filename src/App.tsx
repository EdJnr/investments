import './App.css';
import Login from './pages/login/login';
import SignUp from './pages/sign-up/signUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/dashboard/dashboard';
import { CoinPage } from './pages/coinPage/coinPage';
import { Default } from './pages/default';
import { NotFound } from './pages/404/404';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='*' element={<NotFound/>}/>

          <Route element={<Default/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/currency/:id' element={<CoinPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
