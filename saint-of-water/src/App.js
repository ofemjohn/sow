import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import LandingPage from './LandingPage';
import SignInSide from './components/SignInSide';
import Dashboard from './components/Dashboard';
// import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/admin" element={<Dashboard />} />
          {/* <Route path="/test" element={<ImageUpload />} /> */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;