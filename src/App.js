import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Cart from './components/Cart';
import Cartpayment from './components/Cartpayment';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App justify-content-center sticky-top">
        <header className="App-header">
          <h1>ElectroMart</h1>
          <p>Your destination for gadgets, accessories, and fast delivery.</p>
        </header>
        <nav className="navbar navbar-expand-lg custom-navbar justify-content-center px-3">
          <ul className="nav nav-pills custom-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Log in</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addproduct">Add product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/' element={<Getproduct />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cartpayment' element={<Cartpayment />} />
        </Routes>
      </div>
    </BrowserRouter >

  );
}

export default App;
