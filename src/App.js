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
