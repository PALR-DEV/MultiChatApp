# MultiChat - Modern Real-Time Chat Application 🚀

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.3-38B2AC.svg)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.17.0-4B32C3.svg)](https://eslint.org/)

</div>

## 🌟 Overview

MultiChat is a modern, real-time chat application built with React and Vite, featuring a sleek user interface and robust functionality. The application provides a seamless chatting experience with real-time message updates, user authentication, profile management, and contact search capabilities.

## ✨ Key Features

- **User Authentication** 🔐
  - Secure login and registration system
  - Profile management
  - Password protection and validation
  - Group chats (Coming Soon!)

- **Real-Time Chat** 💬
  - Instant message delivery
  - User online status indicators (Coming Soon!)
  - Message history preservation

- **Modern UI/UX** 🎨
  - Responsive design for all devices
  - Dark theme with animated backgrounds
  - Smooth transitions and loading states
  - Interactive chat bubbles and user avatars

- **Contact Management** 👥
  - User search functionality
  - Contact list with online status
  - Easy conversation initiation

- **Profile Customization** 👤
  - Basic profile settings
  - User status management
  - Account settings configuration
  - Group chat support (Planned)

## 🛠️ Technical Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Styling**: TailwindCSS 4.0.3
- **Routing**: React Router DOM 7.1.5
- **Database**: PostgreSQL (Docker Container)
- **Code Quality**: ESLint 9.17.0
- **Development Tools**: 
  - @vitejs/plugin-react
  - @types/react & @types/react-dom
  - eslint-plugin-react & eslint-plugin-react-hooks

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn package manager
- Docker and Docker Compose

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd multi-chat
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Start the development server
```bash
yarn dev
# or
npm run dev
```

4. Build for production
```bash
yarn build
# or
npm run build
```

## 🏗️ Project Structure

```
multi-chat/
├── src/
│   ├── Components/          # React components
│   │   ├── HomeView.jsx     # Main chat interface
│   │   ├── LoginView.jsx    # Authentication view
│   │   ├── MessageArea.jsx  # Chat messages component
│   │   ├── ProfileView.jsx  # User profile management
│   │   └── SignupView.jsx   # Registration view
│   ├── Services/            # API services
│   │   └── AuthService.jsx  # Authentication logic
│   ├── assets/             # Static assets
│   └── main.jsx           # Application entry point
├── public/                # Public assets
└── package.json          # Project dependencies
```

## 🎯 Features in Detail

### Authentication System
- Secure user registration with email verification
- Login with username/email and password
- Token-based authentication
- Password validation and security measures

### Chat Interface
- Real-time message updates
- Message history loading
- User typing indicators
- Online/offline status
- Profile picture integration

### Profile Management
- Custom profile picture upload
- User status updates
- Account settings configuration
- Privacy and security settings

### Contact System
- User search functionality
- Contact list management
- Conversation initialization
- User profile viewing

## 🎨 UI/UX Features

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interfaces

- **Visual Effects**
  - Smooth animations
  - Loading state indicators
  - Interactive feedback
  - Dynamic backgrounds

- **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support

## 🔧 Configuration

The application can be configured through environment variables:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000

# Database Configuration
POSTGRES_USER=multichat
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=multichat_db
POSTGRES_PORT=5432
```

### Database Setup

The application uses PostgreSQL running in a Docker container. To start the database:

```bash
# Start PostgreSQL container
docker run -d \
  --name multichat-db \
  -e POSTGRES_USER=multichat \
  -e POSTGRES_PASSWORD=your_secure_password \
  -e POSTGRES_DB=multichat_db \
  -p 5432:5432 \
  -v multichat_data:/var/lib/postgresql/data \
  postgres:latest
```

This will create a PostgreSQL instance with:
- Persistent data storage using Docker volumes
- Secure user credentials
- Default port mapping (5432)
- Latest PostgreSQL version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- TailwindCSS team for the utility-first CSS framework
