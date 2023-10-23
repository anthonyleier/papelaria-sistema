import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VendasPage from "./vendas/VendasPage";
import ComissoesPage from "./comissoes/ComissoesPage";
import NovaVenda from "./vendas/NovaVenda";
import AlterarVenda from "./vendas/AlterarVenda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VendasPage />} />
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/vendas/adicionar" element={<NovaVenda />} />
        <Route path="/vendas/alterar/:id" element={<AlterarVenda />} />
        <Route path="/comissoes" element={<ComissoesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
