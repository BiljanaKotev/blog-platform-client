import React from 'react';
import '../component/Comments.css';

function Comments() {
  return (
    <div className="comments-wrapper">
      <form>
        <textarea className="comments-textarea" name="" id="" cols="30" rows="10"></textarea>
      </form>
    </div>
  );
}

export default Comments;
