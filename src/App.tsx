
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>


  );
};

export default App
