from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from .models import Post, Comment, Reply
from .serializers import PostSerializer, CommentSerializer, ReplySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers, status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password


# User Handling
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','email','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]

        user = User(
            username=email,
            email=email,
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name")
        )
        user.set_password(password)
        user.save()
        return user

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(RegisterSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#User Handling End

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Post.objects.filter(Q(is_public=True) | Q(author=user)).select_related('author').prefetch_related('likes') 
        return Post.objects.filter(is_public=True).select_related('author').prefetch_related('likes')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_like_post(request, pk):
    user = request.user
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user in post.likes.all():
        post.likes.remove(user)
        return Response({'status':'unliked', 'like_count': post.likes.count()})
    else:
        post.likes.add(user)
        return Response({'status':'liked', 'like_count': post.likes.count()})

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_pk')
        serializer.save(author=self.request.user, post_id=post_id)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_like_comment(request, pk):
    user = request.user
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user in comment.likes.all():
        comment.likes.remove(user)
        return Response({'status':'unliked', 'like_count': comment.likes.count()})
    else:
        comment.likes.add(user)
        return Response({'status':'liked', 'like_count': comment.likes.count()})

class ReplyCreateView(generics.CreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        comment_id = self.kwargs.get('comment_pk')
        serializer.save(author=self.request.user, comment_id=comment_id)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_like_reply(request, pk):
    user = request.user
    try:
        reply = Reply.objects.get(pk=pk)
    except Reply.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user in reply.likes.all():
        reply.likes.remove(user)
        return Response({'status':'unliked', 'like_count': reply.likes.count()})
    else:
        reply.likes.add(user)
        return Response({'status':'liked', 'like_count': reply.likes.count()})
