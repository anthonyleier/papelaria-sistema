import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VendasPage from "./components/vendas/VendasPage";
import VendaForm from "./components/vendas/VendaForm";
import ComissoesPage from "./components/comissoes/ComissoesPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VendasPage />} />
                <Route path="/vendas" element={<VendasPage />} />
                <Route path="/vendas/adicionar" element={<VendaForm />} />
                <Route path="/vendas/alterar/:id" element={<VendaForm />} />
                <Route path="/comissoes" element={<ComissoesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
