import { useState, useEffect } from 'react';
import LoginView from './Components/LoginView.jsx';
import SignUpView from './Components/SignUpView.jsx';
import HomeView from './Components/HomeView.jsx';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './config/supabase.jsx';
import ProfileView from './Components/ProfileView.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999]">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white bg-transparent shadow-2xl"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* If user is not logged in, they can only access login and signup */}
        {!session ? (
          <>
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignUpView />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* If user is logged in, they can only access home */
          <>
            <Route path="/home" element={<HomeView />} />
            <Route path='/profile' element={<ProfileView />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
