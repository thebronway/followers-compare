import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';
import Trends from './views/Trends';
import Privacy from './views/legal/Privacy';
import Terms from './views/legal/Terms';
import About from './views/legal/About';
import Disclaimer from './views/legal/Disclaimer';
import Contact from './views/legal/Contact';
import BlogIndex from './views/BlogIndex';
import BlogPost from './views/BlogPost';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trends" element={<Trends />} />
          
          {/* Legal Routes */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;