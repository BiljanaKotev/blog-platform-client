import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import BlogFeed from './pages/BlogFeed';
import BlogPost from './pages/BlogPost';
import UserPost from './pages/UserPost';
import EditComments from './component/EditComments';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import EditPage from './pages/EditPage';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState(undefined);
  let navbarColor = 'f';
  let navLinkColor = '';
  const { user } = useContext(AuthContext);
  // const { id } = useParams;

  navbarColor = location.pathname === '/create-post' ? '#f5f5f5' : '';
  navLinkColor = location.pathname === '/login' ? '#000000' : '';

  return (
    <div className="App">
      <Navbar color={navbarColor} navLinkColor={navLinkColor} />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<Dashboard key={user?.id || 'default'} />} />
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="blog-feed" element={<BlogFeed />}></Route>
        <Route path="blog-feed/:id" element={<BlogPost />}></Route>
        <Route path="/user-posts/:id" element={<UserPost errMsg={errorMsg} setErrMsg={setErrorMsg} />}></Route>
        <Route path="/user-posts/:id/edit" element={<EditPage />} />
        <Route path="/blog-feed/:postId/comments/:commentId" element={<EditComments />} />
      </Routes>
    </div>
  );
}

export default App;
