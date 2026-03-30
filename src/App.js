import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className='text-warning'>Electronics</h1>
        </header>
        <nav>
          <Link to="/" className='navlink'>Home</Link>
          <Link to="/signup" className='navlink'>SignUp</Link>
          <Link to="/signin" className='navlink'>Signin</Link>
          <Link to="/addproduct" className='navlink'>products</Link>
        </nav>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/' element={<Getproduct />} />
          <Route path='/makepayment' element ={<Makepayment/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
