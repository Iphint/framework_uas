import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import DaftarSiswa from './pages/DaftarSiswa';
import Denah from './pages/Denah';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import { ApolloProvider } from '@apollo/client';
import { GraphQlClient } from './api/Graph';
import Form from './component/Form';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ApolloProvider client={GraphQlClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
          <Route path='/admin/form' element={<Form/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/daftarsiswa' element={<DaftarSiswa/>}></Route>
          <Route path='/denah' element={<Denah/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/admin/mahasiswa' element={<Admin/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
