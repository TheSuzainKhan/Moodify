# 🎵 Moodify

> **Detect your expression. Get a playlist that fits it.**

Moodify is a full-stack web application that uses real-time facial expression detection to generate mood-matched music playlists. Point your camera, detect your mood, and instantly get a curated queue of tracks — powered by MediaPipe and the iTunes Search API.

🔗 **Live Demo:** [https://moodify-w92w.onrender.com](https://moodify-w92w.onrender.com)

---

## 🧰 Built With

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![ImageKit](https://img.shields.io/badge/ImageKit-FF5722?style=for-the-badge&logo=imagekit&logoColor=white)

---

## ✨ Features

- **🎭 Real-time Face Expression Detection** — Uses Google MediaPipe's Face Landmarker to detect your current mood directly from your webcam
- **🎶 Mood-Matched Playlists** — Automatically fetches songs that match your detected expression (happy, sad, surprised)
- **🔍 iTunes Integration** — Pulls live song previews from the iTunes Search API when local songs are unavailable
- **☁️ Cloud Song Upload** — Admins can upload songs with ID3 tag extraction; files are stored via ImageKit CDN
- **🔐 Auth System** — JWT-based authentication with secure cookie storage and Redis-backed token blacklisting on logout
- **🎧 Built-in Player** — Full-featured music player with playlist navigation built into the UI
- **📱 Responsive Design** — Clean, minimal interface built with SCSS

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| React Router v7 | Client-side routing |
| MediaPipe Tasks Vision | Face landmark & expression detection |
| Axios | HTTP client |
| SCSS / Sass | Styling |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| Redis (ioredis) | Token blacklist cache |
| JWT + bcryptjs | Authentication |
| Multer | File upload handling |
| node-id3 | MP3 metadata (ID3 tag) extraction |
| ImageKit | Cloud media storage & CDN |

### Deployment
| Tech | Purpose |
|---|---|
| Render | Backend hosting |
| iTunes Search API | External song source |

---

## 📁 Project Structure

```
Moodify/
├── Backend/
│   ├── server.js                  # Entry point
│   ├── src/
│   │   ├── app.js                 # Express app setup
│   │   ├── config/
│   │   │   ├── database.js        # MongoDB connection
│   │   │   └── cache.js           # Redis connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Register, login, logout, getMe
│   │   │   └── song.controller.js # Upload song, fetch by mood
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js  # JWT verification
│   │   │   └── upload.middleware.js# Multer config
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── song.model.js
│   │   │   └── blacklist.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── song.routes.js
│   │   └── services/
│   │       └── storage.service.js # ImageKit upload service
│   └── public/                    # Built frontend (served statically)
│
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/              # Login, Register, Auth context
    │   │   ├── expression/        # FaceExpression component + MediaPipe utils
    │   │   ├── home/              # Home page, Player, song context
    │   │   └── shared/            # Global styles
    │   ├── App.jsx
    │   ├── app.routes.jsx
    │   └── main.jsx
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB URI
- Redis instance (local or cloud)
- ImageKit account (for song/poster uploads)

### 1. Clone the repository

```bash
git clone https://github.com/TheSuzainKhan/Moodify.git
cd Moodify
```

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=your_redis_url
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

### 4. Build for Production

```bash
cd Frontend
npm run build
```

Copy the `dist/` contents into `Backend/public/` — the Express server serves the frontend statically.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Logout and blacklist token |
| GET | `/api/auth/me` | Get current user (protected) |

### Songs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/songs?mood=happy` | Fetch songs by mood |
| POST | `/api/songs/upload` | Upload a song (protected, multipart) |

---

## 🧠 How the Mood Detection Works

1. On the Home page, the **FaceExpression** component initializes Google MediaPipe's Face Landmarker via the webcam.
2. When you click **"Detect expression"**, it captures your face landmarks in real time.
3. The expression is classified into one of: `happy`, `sad`, or `surprised`.
4. The detected mood is sent to the backend, which:
   - First checks the local MongoDB for uploaded songs matching the mood.
   - If fewer than 6 local songs exist, it queries the **iTunes Search API** with mood-specific search terms.
   - Returns a playlist of up to 12 tracks.
5. The built-in player loads the playlist and you can browse and play tracks.

---

## 👤 About the Developer

**Mohd Suzain Khan**
B.Tech CSE Student | Full Stack Developer

I'm a third-year Computer Science student at Moradabad Institute of Technology (AKTU) and a Full Stack Developer intern at IBM and Vault of Codes. I'm passionate about building products that sit at the intersection of AI and real-world user experience. Moodify is one of those experiments — taking something as personal as your mood and turning it into something you can actually hear.

- 🐙 GitHub: [@TheSuzainKhan](https://github.com/TheSuzainKhan)
- 💼 LinkedIn: [suzainkhan](https://linkedin.com/in/suzainkhan)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
