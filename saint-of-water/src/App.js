import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import SignInSide from './components/SignInSide';
import Dashboard from './components/Dashboard';
import Video from './components/Video'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/Video" element={<Video />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;