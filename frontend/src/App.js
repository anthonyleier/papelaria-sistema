import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MenuPage from "./Menu/MenuPage";
import VendasPage from "./Vendas/Listar/VendasPage";
import ComissoesPage from "./Comissoes/Listar/comissoesPage";
import NovaVenda from "./Vendas/Criar/NovaVenda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/vendas/adicionar" element={<NovaVenda />} />
        <Route path="/comissoes" element={<ComissoesPage />} />
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
