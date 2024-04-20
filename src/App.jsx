import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portifolio from './pages/Portifolio';
import CodiceDesvelado from './pages/CodiceDesvelado';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import WorksPage from './pages/WorksPage';

function App() {
  const isMobile = window.innerWidth < 640;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portifolio isMobile={isMobile} />} />
        <Route path="/codice-desvelado" element={<CodiceDesvelado />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/works" element={<WorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
