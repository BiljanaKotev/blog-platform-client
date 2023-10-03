import React from 'react';
import '../pages/BlogPost.css';
import { useNavigate } from 'react-router-dom';

function BlogPost() {
  const navigate = useNavigate();
  const handlePublish = () => {
    navigate('/blog-feed');
  };

  return (
    <main className="blog-main">
      <form className="form" action="">
        <div className="form-container">
          <div>
            <label className="cover-img-label" htmlFor="cover-img-input">
              Add a cover image
            </label>
            <input className="file-input" name="cover-img-input" id="cover-img-input" type="file" accept="image" data-max-file-size-mb="25" />
          </div>
          <div>
            <textarea name="" id="" cols="30" rows="10">
              New post title here.....
            </textarea>
          </div>
          <div>
            <textarea name="" id="" cols="30" rows="10">
              Write your post content here
            </textarea>
          </div>
        </div>
        <button type="submit" onClick={handlePublish}>
          Publish
        </button>
      </form>
    </main>
  );
}

export default BlogPost;
