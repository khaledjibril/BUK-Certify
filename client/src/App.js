import React, { useState } from 'react';
import Navbar from './Navbar';
import About from './About';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import LandingPage from './LandingPage';
import VerifierLogin from './VerifierLogin';
import Footer from './Footer';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');
  const [admin, setAdmin] = useState(!!localStorage.getItem('buk_admin_token'));

  let content;
  if (page === 'landing') content = <LandingPage setPage={setPage} />;
  else if (page === 'about') content = <About />;
  else if (page === 'verifier') content = <VerifierLogin />;
  else if (page === 'admin') content = admin ? <AdminDashboard onLogout={()=>{setAdmin(false);setPage('landing');}} /> : <AdminLogin onLogin={()=>setAdmin(true)} />;
  else content = <LandingPage setPage={setPage} />;

  return (
    <div className="App">
      <Navbar setPage={setPage} adminLink />
      {content}
      <Footer />
    </div>
  );
}

export default App;
