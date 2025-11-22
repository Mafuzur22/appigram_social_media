import React, { useContext, useEffect, useState } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import FeedHeader from './FeedHeader';
import FeedSidebar from './FeedSidebar';
import FeedStories from './FeedStories';
import FeedRightSidebar from './FeedRightSidebar';

export default function Feed(){
  const { authHeaders, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await api.get('posts/');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onNewPost = (post) => {
    setPosts(prev => [post, ...prev]);
  };

  const onUpdatePost = (updated) => {
    setPosts(prev => prev.map(p => p.id === updated.id ? {...p, ...updated}: p));
  };

  return (
    <div style={{background: '#f7f8fa', minHeight: '100vh'}}>
      <FeedHeader />
      <section className="_feed_wrapper" style={{padding: '40px 0'}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-4 mb-xl-0">
              <FeedSidebar />
            </div>
            <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12">
              <FeedStories />
              <div className="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                {/* Improved CreatePost area styling */}
                <CreatePost onCreated={onNewPost}/>
              </div>
              <div className="_feed_posts_list">
                {posts.map(p => <PostCard key={p.id} post={p} onUpdate={onUpdatePost} />)}
              </div>
            </div>
            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 mt-4 mt-xl-0">
              <FeedRightSidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
