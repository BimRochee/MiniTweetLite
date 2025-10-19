# MiniTweetLite

A modern Twitter-like social media application built with Laravel and React, featuring user authentication, tweet creation, and real-time interactions.

## 🚀 Features

- **User Authentication**: Secure registration and login with Laravel Sanctum
- **Tweet Creation**: Post tweets with 280 character limit
- **Interactive Feed**: View and interact with tweets from all users
- **Like System**: Like and unlike tweets with real-time updates
- **Responsive Design**: Pixel-perfect UI with Tailwind CSS
- **Loading States**: Smooth loading animations throughout the app
- **Test Coverage**: Comprehensive testing for both frontend and backend

## 🛠 Tech Stack

### Backend
- **Laravel 12.34.0** - PHP framework
- **Laravel Sanctum** - API authentication
- **PHP 8.2.0** - Programming language
- **MySQL** - Database
- **PHPUnit/Pest** - Testing framework

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool
- **Tailwind CSS 3.4.18** - Styling framework
- **Axios** - HTTP client
- **Vitest** - Testing framework

## 📋 Requirements

- PHP 8.2+
- Node.js 18+
- Composer
- MySQL
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/MiniTweetLite.git
cd MiniTweetLite
```

### 2. Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Results
- **Backend**: 24 tests passed (72 assertions)
- **Frontend**: 27 tests passed (4 test files)

## 📁 Project Structure

```
MiniTweetLite/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── TweetController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Tweet.php
│   │       └── TweetLike.php
│   ├── database/migrations/
│   ├── routes/api.php
│   └── tests/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tweet.jsx
│   │   │   └── TweetForm.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── tweets.js
│   │   └── __tests__/
│   └── package.json
└── README.md
```

## 🎨 UI Features

### Authentication Pages
- **Login Form**: Clean, centered design with Poppins font
- **Register Form**: Multi-field form with first name and surname
- **Smooth Transitions**: Animated form switching

### Dashboard
- **Navigation Bar**: Fixed header with logo and user profile
- **Tweet Creation**: Compose new tweets with character counter
- **Tweet Feed**: Display all tweets with user information
- **Interactive Elements**: Like buttons with heart icons

### Design System
- **Colors**: Black (#121419) and white theme
- **Typography**: Poppins and Inter fonts
- **Layout**: Precise container dimensions and spacing
- **Animations**: Loading spinners and smooth transitions

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get user profile

### Tweets
- `GET /api/tweets` - Get all tweets (paginated)
- `POST /api/tweets` - Create new tweet
- `GET /api/tweets/{id}` - Get specific tweet
- `DELETE /api/tweets/{id}` - Delete tweet (owner only)
- `POST /api/tweets/{id}/like` - Toggle tweet like

## 🧪 Test Coverage

### Backend Tests (PHPUnit/Pest)
- User registration and authentication
- API endpoint validation
- Database relationships
- Error handling

### Frontend Tests (Vitest)
- Component rendering
- User interactions
- API integration
- Context management

## 🚀 Deployment

### Production Build
```bash
cd frontend
npm run build
```

### Environment Variables
Create `.env` files for both backend and frontend with appropriate configuration.

## 📝 Commit History

The project follows conventional commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions
- `style:` - UI/styling changes
- `refactor:` - Code refactoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is created as part of a technical assessment for CreativeX Tech Labs Inc.

## 📧 Contact

For questions about this project, please contact: dev.bimrochee@gmail.com

---

**Built with ❤️ using Laravel, React, and Tailwind CSS**
