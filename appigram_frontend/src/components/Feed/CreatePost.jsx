import React, { useState, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';

export default function CreatePost({ onCreated }){
  const { token } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
const submit = async (e) => {
  e.preventDefault();
  
  if (!token) return alert("Not logged in");

  const fd = new FormData();
  fd.append('text', text);
  if (image) fd.append('image', image);
  fd.append('is_public', isPublic ? 'true' : 'false'); // important!

  try {
    const res = await api.post('posts/', fd, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
    onCreated(res.data);
    setText('');
    setImage(null);
  } catch (err) {
    console.log(err.response?.data);
    alert("Error creating post");
  }
};

  return (
    <form onSubmit={submit} className="create-post p-3 p-md-4 rounded-4 shadow-sm bg-white">
  
  {/* Textarea */}
  <div className="mb-3">
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="What's happening?"
      className="form-control rounded-3 shadow-none"
      rows="3"
    ></textarea>
  </div>

  {/* File Upload + Public Toggle */}
  <div className="d-flex justify-content-between align-items-center mb-3">

    {/* File Upload */}
    <div>
      <label className="btn btn-outline-primary btn-sm mb-0 rounded-3">
        Upload Image
        <input
          type="file"
          accept="image/*"
          className="d-none"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
    </div>

    {/* Public Switch */}
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isPublic}
        onChange={(e) => setIsPublic(e.target.checked)}
        id="publicSwitch"
      />
      <label className="form-check-label" htmlFor="publicSwitch">
        Public
      </label>
    </div>
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold">
    Post
  </button>

</form>

  );
}
