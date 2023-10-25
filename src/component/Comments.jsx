import React from 'react';
import '../component/Comments.css';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../component/Comments.css';
import { Link } from 'react-router-dom';
import DeleteComment from './DeleteComment';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { API_URL } from '../api/service';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [dropDown, setIsDropDown] = useState(false);
  const token = localStorage.getItem('authToken');
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  function capitalizeName() {
    if (user) {
      const firstChar = user.name[0].toUpperCase();
      const substring = user.name.substring(1);
      return firstChar + substring;
    } else {
      return 'user not found';
    }
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/blog-feed/${id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/blog-feed/${id}/comments`, { text: newComment }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dropDownMenu = (commentId) => {
    if (dropDown === commentId) {
      setIsDropDown(false);
    } else {
      setIsDropDown(commentId);
    }
  };

  const handleCommentDeleted = (deletedCommentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment._id !== deletedCommentId));
  };

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="comments-textarea-container">
          <textarea className="comments-textarea" value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
          <button className="comments-btn" type="submit">
            Add Comment
          </button>
        </div>
      </form>

      {comments.map((comment) => (
        <div key={comment._id} className="comments-container">
          <div className="user-img-container">
            <img className="blogfeed-profile-pic" src={comment.author.profilePicUrl} alt="User" />
          </div>
          <p className="comment-author">
            <strong>{capitalizeName()}</strong>: {comment.text}
          </p>

          <button className="ellipsis" onClick={() => dropDownMenu(comment._id)}>
            ...
          </button>
          {dropDown === comment._id ? (
            <ul style={{ display: 'block' }} className="comments-dropdown">
              <Link to={`/blog-feed/${id}/comments/${comment._id}`}>
                <li className="comment-edit-link">Edit</li>
              </Link>

              <DeleteComment commentId={comment._id} postId={id} onCommentDeleted={handleCommentDeleted} />
            </ul>
          ) : (
            <ul style={{ display: 'none' }} className="comments-dropdown">
              <Link to={`/blog-feed/${id}/comments/${comment._id}`}>
                <li>Edit</li>
              </Link>

              <DeleteComment commentId={comment._id} postId={id} />
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
