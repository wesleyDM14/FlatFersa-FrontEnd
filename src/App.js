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

function App() {
  return (
    <Router>
      <StyledContainer>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </StyledContainer>
    </Router>
  );
}

export default App;
