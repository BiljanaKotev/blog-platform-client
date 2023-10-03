import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import BlogFeed from './pages/BlogFeed';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  let navbarColor = '';
  let navLinkColor = '';

  navbarColor = location.pathname === '/blog-post' ? '#f5f5f5' : '';
  navLinkColor = location.pathname === '/login' ? '#000000' : '';

  return (
    <div className="App">
      <Navbar color={navbarColor} navLinkColor={navLinkColor} />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/blog-post" element={<BlogPost />}></Route>
        <Route path="blog-feed" element={<BlogFeed />}></Route>
        <Route path="blog-feed:/id" element={<BlogFeed />}></Route>
      </Routes>
    </div>
  );
}

export default App;

