import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './MenuPage';
import VendasPage from './VendasPage';
import ComissoesPage from './ComissoesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/comissoes" element={<ComissoesPage />} />
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
