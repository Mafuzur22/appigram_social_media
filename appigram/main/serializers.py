from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Comment, Reply

User = get_user_model()

class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')

class ReplySerializer(serializers.ModelSerializer):
    author = UserShortSerializer(read_only=True)
    like_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Reply
        fields = ('id', 'comment', 'author', 'text', 'created_at', 'like_count', 'liked_by')

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_liked_by(self, obj):
        users = obj.likes.all()[:10]
        return UserShortSerializer(users, many=True).data

class CommentSerializer(serializers.ModelSerializer):
    author = UserShortSerializer(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'text', 'created_at', 'like_count', 'liked_by', 'replies')

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_liked_by(self, obj):
        users = obj.likes.all()[:10]
        return UserShortSerializer(users, many=True).data

class PostSerializer(serializers.ModelSerializer):
    author = UserShortSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'text', 'image', 'is_public', 'created_at', 'like_count', 'liked_by', 'comments')

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_liked_by(self, obj):
        users = obj.likes.all()[:10]
        return UserShortSerializer(users, many=True).data
