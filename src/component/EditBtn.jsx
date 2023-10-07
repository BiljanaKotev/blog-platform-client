import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from './DeleteBtn';
import '../pages/UserPosts.css';

const API_URL = 'http://localhost:5005';

function EditBtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  const editPost = () => {
    navigate(`/user-posts/${id}/edit`);
  };

  return (
    <div className="user-posts-btns-container">
      <DeleteBtn />
      <button onClick={editPost}>Edit</button>
    </div>
  );
}

export default EditBtn;
