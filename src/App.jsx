
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import LoginView from './Components/LoginView'
import authService from './Services/AuthService'
import HomeView from './Components/HomeView'
import SearchContactView from './Components/searchContactView'
import ProfileView from './Components/ProfileView'
import SignupView from './Components/SignupView'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const validation = await authService.validateToken(token)
          if (validation.isValid) {
            setIsAuthenticated(true)
            setUser(validation.decoded)
            localStorage.setItem('token', token)
          } else {
            handleLogout()
          }
        } catch (error) {
          console.error('Token validation error:', error)
          handleLogout()
        }
      }
      setIsLoading(false)
    }
    validateAuth()
  }, [])


  const handleLogout = async () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }


  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <Router>
      <Routes>
        {/* Public Routes (Non-authenticated) */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginView />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupView />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Protected Routes (Authenticated) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomeView/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/search-contact"
          element={
            isAuthenticated ? (
              <SearchContactView/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/my-profile"
          element={
            isAuthenticated ? (
              <ProfileView/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}



export default App
