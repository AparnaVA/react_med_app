import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';

function ConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this medicine ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostListItem(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(store => store.auth.user);

  function handleDeleteConfirmation() {
    setIsModalOpen(true);
  }

  function handleDeletePost() {
    axios
      .delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(response => {
        alert(response.data.message);
        props.refresh();
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  }

  return (
    <div className="card">
      <div className="card-body">
        {props.post.name}
        <button className="btn btn-danger float-right" onClick={handleDeleteConfirmation}>
          Delete
        </button>
        <Link to={`/blog/medicine/${props.post.id}/edit`} className="btn btn-warning float-right">
          Edit
        </Link>
        <Link to={`/blog/medicine/${props.post.id}`} className="btn btn-info float-right">
          View
        </Link>
        <ConfirmationModal
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeletePost}
        />
      </div>
    </div>
  );
}

export default checkAuth(PostListItem);
