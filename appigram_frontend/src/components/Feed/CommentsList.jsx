import React, { useState, useContext } from 'react';
import {api, apiRoot} from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';

export default function CommentsList({ post, onUpdatePost }){
  const { token } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [comments, setComments] = useState((post.comments && post.comments.length > 0) ? [post.comments[0]] : []);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`posts/${post.id}/comments/`, { text, post: post.id }, { headers: { Authorization: `Bearer ${token}` }});
      // res contains created comment
      // refresh post to get latest structure
      const fresh = await api.get(`posts/`);
      const updated = fresh.data.find(p => p.id === post.id);
      if (updated) {
        setComments(updated.comments);
        onUpdatePost(updated);
      }
      setText('');
    } catch (err) {
      if (err.response) {
        console.error('Comment POST error:', err.response.data);
        alert('Failed to add comment: ' + JSON.stringify(err.response.data));
      } else {
        console.error('Comment POST error:', err);
        alert('Failed to add comment: ' + err.message);
      }
    }
  };

  const toggleLikeComment = async (commentId) => {
    await api.post(`comments/${commentId}/toggle_like/`, {}, { headers: { Authorization: `Bearer ${token}` }});
    const fresh = await api.get(`posts/`);
    const updated = fresh.data.find(p => p.id === post.id);
    if (updated) {
      setComments(updated.comments);
      onUpdatePost(updated);
    }
  };

  const addReply = async (commentId, replyText) => {
    await api.post(`comments/${commentId}/replies/`, { text: replyText, comment: commentId }, { headers: { Authorization: `Bearer ${token}` }});
    const fresh = await api.get(`posts/`);
    const updated = fresh.data.find(p => p.id === post.id);
    if (updated) {
      setComments(updated.comments);
      onUpdatePost(updated);
    }
  };

  return (
    <div className="_feed_comments_list card mt-3 p-3">
      <form className="_feed_inner_comment_box_form d-flex align-items-center mb-3" onSubmit={addComment}>
        <div className="_feed_inner_comment_box_content_image me-2">
          <img src="/assets/images/comment_img.png" alt="" className="_comment_img" style={{width:32, height:32, borderRadius:'50%'}} />
        </div>
        <div className="_feed_inner_comment_box_content_txt flex-grow-1">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="form-control _comment_textarea" placeholder="Write a comment..." rows={1} style={{resize:'none'}} />
        </div>
        <div className="_feed_inner_comment_box_icon ms-2 d-flex align-items-center gap-1">
          <button type="button" className="_feed_inner_comment_box_icon_btn" tabIndex={-1} style={{background:'none',border:'none',padding:0}}>
            {/* Emoji SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#FFD600"/><path d="M6.5 8.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm7 0c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm-6.5 3c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm6.5 0c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm-3.5 2c1.104 0 2-.896 2-2H8c0 1.104.896 2 2 2z" fill="#000"/></svg>
          </button>
          <button type="submit" className="_feed_inner_comment_box_icon_btn" style={{background:'none',border:'none',padding:0}}>
            {/* Send SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 10l16-8-8 16-2-6-6-2z" fill="#1890FF"/></svg>
          </button>
        </div>
      </form>
      <div className="_feed_comments_items">
        {comments.map(c => (
          <div key={c.id} className="_feed_comment_item mb-3 p-2 rounded bg-light">
            <div className="d-flex align-items-center mb-1">
              <img src={c.author.avatar || '/assets/images/profile.png'} alt="avatar" style={{width:28, height:28, borderRadius:'50%', objectFit:'cover', marginRight:8}} />
              <strong className="me-2">{c.author.first_name} {c.author.last_name}</strong>
              <span className="text-muted" style={{fontSize:'0.85em'}}>{c.text}</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>Likes: {c.like_count}</span>
              <button className="btn btn-sm btn-outline-primary" onClick={()=>toggleLikeComment(c.id)}>Like</button>
            </div>
            <div className="_feed_comment_replies ms-4">
              {c.replies.map(r => (
                <div key={r.id} className="_feed_reply_item mb-1">
                  <strong>{r.author.first_name}</strong>: {r.text} <span className="text-muted" style={{fontSize:'0.85em'}}>Likes: {r.like_count}</span>
                </div>
              ))}
              <ReplyForm onReply={(replyText)=>addReply(c.id, replyText)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReplyForm({ onReply }){
  const [val, setVal] = useState('');
  return (
    <form className="d-flex gap-2 mt-2" onSubmit={(e)=>{e.preventDefault(); onReply(val); setVal('');}}>
      <input value={val} onChange={e=>setVal(e.target.value)} className="form-control form-control-sm" placeholder="Reply..." />
      <button type="submit" className="btn btn-sm btn-outline-secondary">Reply</button>
    </form>
  );
}
