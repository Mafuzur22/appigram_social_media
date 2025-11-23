<h1 align="center">📱 Appigram</h1>
<p align="center">
  A Full-Stack Social Feed Application
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Django-092E20?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-SQLite3-lightgrey?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-REST%20Framework-red?style=for-the-badge" />
</p>

---

## 🚀 Overview

**Appigram** is a mini social networking app where users can:

- 🔐 Register & Login (JWT Authentication)
- 📝 Create posts with text + images  
- 👍 Like/Unlike posts
- 💬 Comment on posts
- ↩️ Reply to comments
- ❤️ Like comments & replies
- 👤 View feed (public + own private posts)
- 🚪 Logout

The project demonstrates a complete **React + Django full-stack workflow**.

---

## 🏗 Tech Stack

### **Frontend**
- ⚛ React + Vite  
- ⚡ Axios  
- 🎨 CSS (based on the provided UI design)  
- 🔐 Context API for authentication  

### **Backend**
- 🐍 Django  
- 🔧 Django REST Framework  
- 🔑 SimpleJWT for token authentication  
- 🗄 SQLite3  
- 🌐 CORS Headers  

---

## 📂 Project Structure <br>

appigram_backend/ <br>
├── appigram/ # Django project configuration <br>
├── users/ # Authentication & registration <br>
├── feed/ # Posts, comments, replies <br>
├── media/ # Image uploads <br>
└── manage.py <br>

appigram_frontend/ <br>
├── src/ <br>
│ ├── components/ # UI components <br>
│ ├── contexts/ # AuthContext.jsx <br>
│ ├── api/ # Axios instance <br>
│ └── App.jsx <br>
└── index.html <br>


# ⚙️ Backend Setup (Django)

### 1️⃣ Create Virtual Environment
```bash
cd appigram_social_media 
python -m venv venv
```
2️⃣ Activate Environment
```bash
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```
3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```
4️⃣ Apply Migrations
```bash
cd appigram
python manage.py migrate
```
5️⃣ Create Superuser (optional)
```bash
python manage.py createsuperuser
```
6️⃣ Start the Server
```bash
python manage.py runserver
Backend available at:
👉 http://127.0.0.1:8000/
```
⚙️ Frontend Setup (React + Vite)
1️⃣ Install Packages
```bash
cd ..
cd appigram_frontend
npm install
```
2️⃣ Start Dev Server
```bash
npm run dev
Frontend available at:
👉 http://localhost:5173/
```
🔗 API Endpoints <br>
🔐 Authentication <br>
Method	Endpoint	Description <br>
POST	/api/auth/register/	Register new user <br>
POST	/api/auth/token/	Login & get JWT <br>

📝 Posts <br>
Method	Endpoint	Description <br>
GET	/api/posts/	Fetch feed <br> <br>
POST	/api/posts/	Create post (with image) <br>
POST	/api/posts/<id>/toggle_like/	Like/Unlike <br>

💬 Comments <br>
Method	Endpoint	Description <br>
POST	/api/posts/<post_id>/comments/	Create comment <br>
POST	/api/comments/<id>/toggle_like/	Like/Unlike comment <br>
<br>
↩️ Replies <br>
| POST | /api/comments/<comment_id>/replies/ | <br>
| POST | /api/replies/<id>/toggle_like/ | <br>

🖼 Media Uploads
Images stored in:

```bash
appigram/media/posts/
Ensure Django settings include:
```
```python
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```
and in urls.py:

```python
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
🔐 Authentication Flow
User logs in → React sends:
```
```json
{
  "username": "email@example.com",
  "password": "password123"
}
```
Django issues JWT (access + refresh)

React stores token in localStorage

Axios attaches:

```makefile
Authorization: Bearer <token>
🛠 Production Build
```
Frontend:
```bash
npm run build
```
Backend:
```bash
python manage.py collectstatic
```
👨‍💻 Author
Mahafuzur Rahman
Full Stack Developer
🌐 React | Django | REST | TailwindCSS

<p align="center">⭐ If you like this project, consider giving it a star! ⭐</p> ```
