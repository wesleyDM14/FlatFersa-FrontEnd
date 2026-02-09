import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyles";

// Wrapper Components
import BasicRoute from "./components/BasicRoute";     // Para usuários NÃO logados (Login, etc)
import PrivateRoute from "./components/PrivateRoute"; // Para usuários LOGADOS

// Pages - PUBLICAS
import LoginPage from "./pages/LoginPage/LoginPage";
import SingInPage from "./pages/SignInPage"; // Verifique se o nome do arquivo é SingIn ou SignIn
import HomePage from "./pages/HomePage/HomePage"; // Se não for usar Home, pode redirecionar direto pro Login
import PoliticaPrivacidade from "./pages/PoliticaPrivacidadePage/PoliticaPrivacidadePage";

// Pages - COMUNS (ADMIN & CLIENTE)
import PerfilPage from "./pages/PerfilPage/PerfilPage";
import Dashboard from "./pages/DashboardPage/DashboardPage";

// Pages - ADMIN (GESTÃO)
import PredioPage from "./pages/PredioPage/PredioPage";
import PredioInfos from "./pages/PredioPage/PredioInfos";
import NovoPredio from "./pages/PredioPage/NovoPredio";

import ClientPage from "./pages/ClientPage/ClientPage";
import ClientInfos from "./pages/ClientPage/ClientInfos";
import NovoClient from "./pages/ClientPage/NovoClient";

import ApartamentoPage from "./pages/ApartamentoPage/ApartamentoPage";
import ApartamentoInfos from "./pages/ApartamentoPage/ApartamentoInfos";
import NovoApartamento from "./pages/ApartamentoPage/NovoApartamento";

import ContractPage from "./pages/ContractPage/ContractPage";
import NovoContract from "./pages/ContractPage/NovoContract";

import FianceiroPage from "./pages/FinanceiroPage/FinanceiroPage";
import ParcelaInfo from "./pages/FinanceiroPage/ParcelaInfo";

// Pages - CLIENTE (INQUILINO)
// import MeusPagamentos from "./pages/FinanceiroPage/MeusPagamentos"; // Vamos criar em breve

const App = ({ checked }) => {
  return (
    <Theme>
      <GlobalStyle />
      <Router>
        {checked && (
          <Routes>
            {/* --- ROTAS PÚBLICAS --- */}
            <Route path="/" element={<BasicRoute><HomePage /></BasicRoute>} />
            <Route path="/login" element={<BasicRoute><LoginPage /></BasicRoute>} />
            <Route path="/signin" element={<BasicRoute><SingInPage /></BasicRoute>} />
            <Route path="/politica-privacidade" element={<BasicRoute><PoliticaPrivacidade /></BasicRoute>} />

            {/* --- ROTAS COMUNS (ACESSÍVEIS POR TODOS LOGADOS) --- */}
            {/* O Dashboard agora controla internamente quem vê o quê */}
            <Route
              path="/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />

            <Route
              path="/perfil"
              element={<PrivateRoute><PerfilPage /></PrivateRoute>}
            />

            {/* --- ROTAS ADMINISTRATIVAS (SÓ ADMIN ACESSA) --- */}
            {/* PRÉDIOS */}
            <Route path="/predios" element={<PrivateRoute allowedRoles={['ADMIN']}><PredioPage /></PrivateRoute>} />
            <Route path="/predios/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoPredio /></PrivateRoute>} />
            <Route path="/predios/:predioId" element={<PrivateRoute allowedRoles={['ADMIN']}><PredioInfos /></PrivateRoute>} />

            {/* CLIENTES */}
            <Route path="/clientes" element={<PrivateRoute allowedRoles={['ADMIN']}><ClientPage /></PrivateRoute>} />
            <Route path="/clientes/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoClient /></PrivateRoute>} />
            <Route path="/clientes/:clientId" element={<PrivateRoute allowedRoles={['ADMIN']}><ClientInfos /></PrivateRoute>} />

            {/* APARTAMENTOS */}
            <Route path="/apartamentos" element={<PrivateRoute allowedRoles={['ADMIN']}><ApartamentoPage /></PrivateRoute>} />
            <Route path="/apartamentos/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoApartamento /></PrivateRoute>} />
            <Route path="/apartamentos/:apartamentoId" element={<PrivateRoute allowedRoles={['ADMIN']}><ApartamentoInfos /></PrivateRoute>} />

            {/* CONTRATOS */}
            <Route path="/contratos" element={<PrivateRoute allowedRoles={['ADMIN']}><ContractPage /></PrivateRoute>} />
            <Route path="/contratos/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoContract /></PrivateRoute>} />

            {/* FINANCEIRO (ADMIN) */}
            <Route path="/financeiro" element={<PrivateRoute allowedRoles={['ADMIN']}><FianceiroPage /></PrivateRoute>} />
            <Route path="/faturas/:faturaId" element={<PrivateRoute allowedRoles={['ADMIN']}><ParcelaInfo /></PrivateRoute>} />


            {/* --- ROTAS DE INQUILINO (SÓ INQUILINO ACESSA) --- */}
            {/* Futuramente vamos descomentar e criar essas páginas */}

            {/* <Route 
                path="/meus-pagamentos" 
                element={<PrivateRoute allowedRoles={['INQUILINO']}><MeusPagamentos /></PrivateRoute>} 
            />
            <Route 
                path="/meu-contrato" 
                element={<PrivateRoute allowedRoles={['INQUILINO']}><MeuContratoPage /></PrivateRoute>} 
            /> 
            */}

            {/* Rota padrão para 404 - Redireciona para Dashboard se logado, ou Login se não */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

          </Routes>
        )}
      </Router>
    </Theme>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
  user: session.user
});

export default connect(mapStateToProps)(App);