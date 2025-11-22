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
    <form onSubmit={submit} className="create-post">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="What's happening?"></textarea>
      <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>
      <label>
        <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)}/>
        Public
      </label>
      <button type="submit">Post</button>
    </form>
  );
}
