import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyles";

import BasicRoute from "./components/BasicRoute";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import LoginPage from "./pages/LoginPage/LoginPage";
import SingInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidadePage/PoliticaPrivacidadePage";
import PerfilPage from "./pages/PerfilPage/PerfilPage";

// Pages - ADMIN
import Dashboard from "./pages/DashboardPage/DashboardPage";
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
//import MeusPagamentos from "./pages/FinanceiroPage/MeusPagamentos";

const App = ({ checked, user }) => {
  return (
    <Theme>
      <GlobalStyle />
      <Router>
        {checked && (
          <Routes>
            <Route path="/" element={<BasicRoute><HomePage /></BasicRoute>} />
            <Route path="/login" element={<BasicRoute><LoginPage /></BasicRoute>} />
            <Route path="/signin" element={<BasicRoute><SingInPage /></BasicRoute>} />
            <Route path="/politica-privacidade" element={<BasicRoute><PoliticaPrivacidade /></BasicRoute>} />
            <Route
              path="/perfil"
              element={<PrivateRoute><PerfilPage /></PrivateRoute>}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route path="/predios" element={<PrivateRoute allowedRoles={['ADMIN']}><PredioPage /></PrivateRoute>} />
            <Route path="/predios/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoPredio /></PrivateRoute>} />
            <Route path="/predios/:predioId" element={<PrivateRoute allowedRoles={['ADMIN']}><PredioInfos /></PrivateRoute>} />

            <Route path="/clientes" element={<PrivateRoute allowedRoles={['ADMIN']}><ClientPage /></PrivateRoute>} />
            <Route path="/clientes/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoClient /></PrivateRoute>} />
            <Route path="/clientes/:clientId" element={<PrivateRoute allowedRoles={['ADMIN']}><ClientInfos /></PrivateRoute>} />

            <Route path="/apartamentos" element={<PrivateRoute allowedRoles={['ADMIN']}><ApartamentoPage /></PrivateRoute>} />
            <Route path="/apartamentos/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoApartamento /></PrivateRoute>} />
            <Route path="/apartamentos/:apartamentoId" element={<PrivateRoute allowedRoles={['ADMIN']}><ApartamentoInfos /></PrivateRoute>} />

            <Route path="/contratos" element={<PrivateRoute allowedRoles={['ADMIN']}><ContractPage /></PrivateRoute>} />
            <Route path="/contratos/novo" element={<PrivateRoute allowedRoles={['ADMIN']}><NovoContract /></PrivateRoute>} />

            <Route path="/financeiro" element={<PrivateRoute allowedRoles={['ADMIN']}><FianceiroPage /></PrivateRoute>} />
            <Route path="/faturas/:faturaId" element={<PrivateRoute allowedRoles={['ADMIN']}><ParcelaInfo /></PrivateRoute>} />

            {/*<Route
              path="/meus-pagamentos"
              element={<PrivateRoute allowedRoles={['INQUILINO']}><MeusPagamentos /></PrivateRoute>}
            />*/}

            <Route path="*" element={<Navigate to="/" replace />} />

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