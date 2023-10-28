import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/BlogFeed.css';
import service from '../api/service';
import Search from '../component/Search';
import capitalizeName from '../utils/utils';

function BlogFeed() {
  const [posts, setPosts] = useState(null);
  console.log(posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    service
      .fetchBlogFeed(token)
      .then((response) => {
        setPosts(response);
        setFilteredPosts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      <Search setFilteredPosts={setFilteredPosts} />
      <div className="blog-feed-container">
        {filteredPosts.map((post) => (
          <div className="blog-feed-post-container" key={post._id}>
            <div>{!post.coverImg ? <div>Loading...</div> : <img className="cover-img" src={post.coverImg} alt="cover" />}</div>
            <div className="user-details-container">
              {post.author && <img className="blogfeed-profile-pic" src={post.author.profilePicUrl} alt="Author" />}

              <h2 className="user-name">{post.author && post.author.name ? capitalizeName(post.author.name) : 'Loading...'}</h2>
            </div>
            <div className="link-container">
              <Link to={`/blog-feed/${post._id}`} className="title-link">
                <h1 className="link-title">{post.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogFeed;
