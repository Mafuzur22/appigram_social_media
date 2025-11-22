import React, { useState, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';
import CommentsList from './CommentsList';

export default function PostCard({ post, onUpdate }) {
  const { token } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [localPost, setLocalPost] = useState(post);

  const toggleLike = async () => {
    const res = await api.post(`posts/${post.id}/toggle_like/`, {}, { headers: { Authorization: `Bearer ${token}` }});
    // res.data.like_count
    // We need to refresh the post (simpler: fetch posts or update counts locally)
    setLocalPost({...localPost, like_count: res.data.like_count});
    // optional: fetch who liked updated
    const fresh = await api.get(`posts/`);
    const updated = fresh.data.find(p => p.id === post.id);
    if (updated) onUpdate(updated);
  };

  return (
    <div className="_feed_post_card card mb-4 p-4 shadow-sm">
      <div className="_feed_post_header d-flex align-items-center mb-3">
        <img src={post.author.avatar || '/assets/images/profile.png'} alt="avatar" className="_feed_post_avatar me-3" style={{width:40, height:40, borderRadius:'50%', objectFit:'cover'}} />
        <div>
          <div className="_feed_post_author fw-bold">{post.author.first_name} {post.author.last_name}</div>
          <div className="_feed_post_created text-muted" style={{fontSize:'0.9em'}}>{new Date(post.created_at).toLocaleString()}</div>
        </div>
      </div>
      <div className="_feed_post_body mb-3">
        <p className="mb-2">{post.text}</p>
        {post.image && <img src={post.image} alt="post" className="_feed_post_image rounded w-100" style={{maxHeight:'400px', objectFit:'cover'}}/>}
      </div>
      <div className="_feed_post_actions d-flex gap-3 mb-2">
        <button className="btn btn-light border" onClick={toggleLike}><i className="bi bi-hand-thumbs-up"></i> Like ({localPost.like_count})</button>
        <button className="btn btn-light border" onClick={()=>setShowComments(s=>!s)}><i className="bi bi-chat"></i> Comments ({post.comments.length})</button>
      </div>
      {showComments && <CommentsList post={post} onUpdatePost={onUpdate}/>}
    </div>
  );
}
