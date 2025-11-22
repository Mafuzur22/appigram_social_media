from django.urls import path
from .views import RegisterView, PostListCreateView, toggle_like_post, CommentCreateView, toggle_like_comment, ReplyCreateView, toggle_like_reply

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='posts-list-create'),
    path('posts/<int:pk>/toggle_like/', toggle_like_post, name='post-toggle-like'),

    path('posts/<int:post_pk>/comments/', CommentCreateView.as_view(), name='comments-create'),
    path('comments/<int:pk>/toggle_like/', toggle_like_comment, name='comment-toggle-like'),

    path('comments/<int:comment_pk>/replies/', ReplyCreateView.as_view(), name='replies-create'),
    path('replies/<int:pk>/toggle_like/', toggle_like_reply, name='reply-toggle-like'),
    path('auth/register/', RegisterView.as_view(), name='register'),

]
