import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Feed from './components/Feed/Feed';

const PrivateRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/feed" element={<PrivateRoute><Feed/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
