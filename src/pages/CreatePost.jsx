import React from 'react';
import '../pages/CreatePost.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();
  const handlePublish = () => {
    navigate('/blog-feed');
  };

  return (
    <main className="blog-main">
      <form className="form" action="">
        <div className="form-container">
          <div>
            <label className="cover-img-label" htmlFor="coverImg">
              Add a cover image
            </label>
            <input className="cover-img-input" name="coverImg" id="coverImg" type="file" accept="image" data-max-file-size-mb="25" />
          </div>
          <div>
            <textarea name="title" id="title" cols="30" rows="10">
              New post title here.....
            </textarea>
          </div>
          <div>
            <textarea name="content" id="content" cols="30" rows="10">
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

export default CreatePost;
