import {
  StyledContainer
} from './components/Styles';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

import AuthRoutes from './components/AuthRoutes';
import BasicRoute from './components/BasicRoutes';
import ClientsPage from './pages/ClientsPage';
import AptPage from './pages/AptPage';

function App() {
  return (
    <Router>
      <StyledContainer>
        <Routes>
          <Route path='/signup' element={<BasicRoute><Signup /></BasicRoute>} />
          <Route path='/login' element={<BasicRoute><Login /></BasicRoute>} />
          <Route path='/' element={<BasicRoute><Home /></BasicRoute>} />
          <Route path='/dashboard' element={<AuthRoutes><Dashboard /></AuthRoutes>} />
          <Route path='/clients' element={<AuthRoutes><ClientsPage /></AuthRoutes>} />
          <Route path='/apartamentos' element={<AuthRoutes><AptPage /></AuthRoutes>} />
        </Routes>
      </StyledContainer>
    </Router>
  );
}

export default App;
