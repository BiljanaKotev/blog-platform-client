import React from 'react';
import '../pages/CreatePost.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import service from '../api/service';

function CreatePost(props) {
  const [coverImgFile, setCoverImgFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');

  const handleCoverImgChange = (e) => {
    setCoverImgFile(e.target.files[0]);
  };

  const handlePublish = () => {
    const postData = {
      title: title,
      content: content,
      author: user._id,
    };

    service
      .createPostWithImage(postData, coverImgFile, token)
      .then((response) => {
        console.log('Post with image created:', response);
        navigate('/blog-feed');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  return (
    <main className="blog-main">
      <form className="form" onSubmit={handleCreateSubmit}>
        <div className="form-container">
          <div>
            <label className="cover-img-label" htmlFor="coverImg">
              Add a cover image
            </label>
            <input className="cover-img-input" name="coverImg" id="coverImg" type="file" accept="image/*" data-max-file-size-mb="25" onChange={handleCoverImgChange} />
            {coverImgFile && <img className="cover-img-preview" src={coverImgFile} alt="Cover preview" />}
          </div>
          <div>
            <textarea className="create-post-title fs-1 mt-5" name="title" id="title" placeholder="New post title here..." value={title} onChange={handleTitle}></textarea>
          </div>
          <div>
            <textarea
              className="create-post-content fs-3 mt-5"
              name="content"
              id="content"
              placeholder="write your post conent here..."
              value={content}
              onChange={handleContent}
            ></textarea>
          </div>
        </div>

        <p>Created by: {user.name}</p>
        <button type="submit" onClick={handlePublish}>
          Publish
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
