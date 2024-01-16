import {
  StyledContainer
} from './components/Styles';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <StyledContainer>
        <Home />
      </StyledContainer>
    </Router>
  );
}

export default App;
