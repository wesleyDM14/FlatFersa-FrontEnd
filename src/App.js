import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyles";

import BasicRoute from "./components/BasicRoute";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/DashboardPage/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import PredioPage from "./pages/PredioPage/PredioPage";
import ClientPage from "./pages/ClientPage/ClientPage";
import ApartamentoPage from "./pages/ApartamentoPage/ApartamentoPage";
import ContractPage from "./pages/ContractPage/ContractPage";
import FianceiroPage from "./pages/FinanceiroPage/FinanceiroPage";
import PerfilPage from "./pages/PerfilPage/PerfilPage";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidadePage/PoliticaPrivacidadePage";

import NovoPredio from "./pages/PredioPage/NovoPredio";
import NovoApartamento from "./pages/ApartamentoPage/NovoApartamento";
import NovoClient from "./pages/ClientPage/NovoClient";
import NovoContract from "./pages/ContractPage/NovoContract";

const App = ({ checked }) => {
  return (
    <Theme>
      <GlobalStyle />
      <Router>
        {
          checked && (
            <Routes>
              <Route path="/" element={<BasicRoute><HomePage /></BasicRoute>} />
              <Route path="/login" element={<BasicRoute><LoginPage /></BasicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/predios" element={<PrivateRoute><PredioPage /></PrivateRoute>} />
              <Route path="/predios/novo" element={<PrivateRoute><NovoPredio /></PrivateRoute>} />
              <Route path="/clientes" element={<PrivateRoute><ClientPage /></PrivateRoute>} />
              <Route path="/clientes/novo" element={<PrivateRoute><NovoClient /></PrivateRoute>} />
              <Route path="/apartamentos" element={<PrivateRoute><ApartamentoPage /></PrivateRoute>} />
              <Route path="/apartamentos/novo" element={<PrivateRoute><NovoApartamento /></PrivateRoute>} />
              <Route path="/contratos" element={<PrivateRoute><ContractPage /></PrivateRoute>} />
              <Route path="/contratos/novo" element={<PrivateRoute><NovoContract /></PrivateRoute>} />
              <Route path="/financeiro" element={<PrivateRoute><FianceiroPage /></PrivateRoute>} />
              <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
              <Route path="/politica-privacidade" element={<PrivateRoute><PoliticaPrivacidade /></PrivateRoute>} />
            </Routes>
          )
        }
      </Router>
    </Theme>
  );
}

const mapStateToPtops = ({ session }) => ({
  checked: session.checked
});

export default connect(mapStateToPtops)(App);
