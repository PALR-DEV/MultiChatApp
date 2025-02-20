import { useState } from 'react'; // View is not a valid React import, removing it
import LoginView from './Components/LoginView.jsx';
import SignUpView from './Components/SignUpView.jsx';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpView />} />
        {/* Catch-all redirects to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
