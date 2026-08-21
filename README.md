# 🎬 CineVerse

CineVerse is a full-stack movie web application built with the **MERN Stack**. It allows users to explore movies, search for their favorite titles, view movie details, watch trailers, manage their watchlist, and securely manage their accounts.

## ✨ Features

* 🎬 Browse and explore movies
* 🔎 Search for movies
* 📄 View detailed movie information
* 🎭 View movie cast
* ▶️ Watch movie trailers
* ❤️ Add movies to watchlist
* 🔐 User registration and login
* 📧 OTP-based email verification
* 🔑 Forgot and reset password
* 👤 Profile image upload
* ☁️ Cloudinary image storage
* 📱 Responsive user interface
* 🔒 Secure authentication
* 🌐 Movie data powered by TMDB API

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Nodemailer
* JWT Authentication

### External Services

* TMDB API — Movie data
* Cloudinary — Profile image storage

## 📁 Project Structure

```text
CineVerse/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd CineVerse
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder and add your required environment variables.

Then start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside the `Frontend` folder and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Then start the frontend:

```bash
npm run dev
```

## 🔐 Environment Variables

Do **not** upload your `.env` files to GitHub.

Example frontend variable:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Backend environment variables may include configuration for:

* MongoDB
* JWT
* Nodemailer
* Cloudinary
* Other application secrets

## 📸 Screenshots

Screenshots can be added here to showcase the CineVerse interface.

## 🚀 Future Improvements

* Advanced movie filtering
* Personalized recommendations
* Improved movie streaming functionality
* Admin dashboard
* More user profile features

## 👨‍💻 Author

**Hassan Nadeem**

Full Stack MERN Developer

* GitHub: `HassanNadeem502`
* LinkedIn: `hassan-nadeem-424263399`

## 📄 License

This project is created for learning and portfolio purposes.
