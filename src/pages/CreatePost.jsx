import React from 'react';
import '../pages/CreatePost.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function CreatePost() {
  const [coverImg, setcoverImg] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user.name);
  const handlePublish = () => {
    const token = localStorage.getItem('authToken');
    setAuthor(user.name);
    axios
      .post(
        `${API_URL}/api/create-post`,
        {
          coverImg: coverImg,
          title: title,
          content: content,
          author: author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Post created:', response.data);
        navigate('/blog-feed');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };
  const handleCreateSubmit = (e) => {
    e.preventDefault();
  };

  const handleCoverImg = (e) => setcoverImg(e.target.value);
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
            <input className="cover-img-input" name="coverImg" id="coverImg" type="file" accept="image/*" data-max-file-size-mb="25" value={coverImg} onChange={handleCoverImg} />
            {coverImg && <img className="cover-img-preview" src={coverImg} alt="Cover preview" />}
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

        <button type="submit" onClick={handlePublish}>
          Publish
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
