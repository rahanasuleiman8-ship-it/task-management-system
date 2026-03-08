# Task Management System

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![ASP.NET Core](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat&logo=dotnet)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

A full-stack task management application built with ASP.NET Core and React, demonstrating modern web development practices.

## 🌟 Features

- **User Authentication** - Secure JWT-based authentication
- **Task Management** - Create, read, update, and delete tasks
- **Project Organization** - Organize tasks into projects
- **Priority Levels** - Set task priorities (Low, Medium, High)
- **Status Tracking** - Track task progress (To Do, In Progress, Done)
- **Responsive Design** - Works on desktop and mobile devices
- **Dashboard** - Visual overview of tasks and statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core** - ORM
- **SQL Server** - Database
- **JWT** - Authentication

## 📁 Project Structure

```
task-management-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── store/          # Redux store and slices
│   │   └── types/          # TypeScript types
│   └── public/
├── server/                 # ASP.NET Core backend
│   ├── Controllers/        # API endpoints
│   ├── Models/             # Database models
│   ├── Services/           # Business logic
│   └── Data/               # Database context
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- .NET 8.0 SDK
- SQL Server (or SQL Server Express)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahanasuleiman8-ship-it/task-management-system.git
   cd task-management-system
   ```

2. **Set up the backend**
   ```bash
   cd server
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

3. **Set up the frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📸 Screenshots

### Dashboard
*Dashboard showing task overview and statistics*

### Task List
*Main task list with filtering and sorting*

### Create Task
*Form to create new tasks*

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/projects | Get all projects |

## 🧪 Testing

```bash
# Backend tests
cd server
dotnet test

# Frontend tests
cd client
npm test
```

## 📈 What I Learned

This project taught me:
- Building RESTful APIs with ASP.NET Core
- Implementing JWT authentication
- React state management with Redux Toolkit
- TypeScript integration in full-stack applications
- Database design with Entity Framework

## 🔮 Future Improvements

- [ ] Real-time updates with SignalR
- [ ] Email notifications
- [ ] Team collaboration features
- [ ] Mobile app version
- [ ] Dark mode support

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

**Rahana Suleiman**
- Email: rahanasuleiman8@gmail.com
- LinkedIn: [linkedin.com/in/rahanasuleiman](https://linkedin.com/in/rahanasuleiman)
- GitHub: [github.com/rahanasuleiman8-ship-it](https://github.com/rahanasuleiman8-ship-it)

---

⭐️ If you found this project interesting, please consider giving it a star!