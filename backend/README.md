# Todo App - Full Stack Application

A complete todo application built with **NestJS** (backend) and **Next.js** (frontend), featuring a modern UI and full CRUD operations.

## 🏗️ Architecture

- **Backend**: NestJS with MongoDB (Mongoose)
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Database**: MongoDB
- **Containerization**: Docker support

## ✨ Features

### Backend (NestJS)

- RESTful API with CRUD operations
- MongoDB integration with Mongoose
- Environment-based configuration
- Error handling and validation
- Docker containerization

### Frontend (Next.js)

- Modern, responsive UI with Tailwind CSS
- Real-time todo management
- Inline editing capabilities
- Mobile-first design
- TypeScript for type safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Docker (optional, for containerized setup)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd todo-app

# Install all dependencies (backend + frontend)
npm run install:all
```

### 2. Environment Setup

#### Backend Environment

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/todo-app
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo-app
```

#### Frontend Environment

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start the Application

#### Option A: Run Both Services Together

```bash
# Start both backend and frontend simultaneously
npm run dev
```

#### Option B: Run Services Separately

```bash
# Terminal 1: Start backend
npm run start:dev

# Terminal 2: Start frontend
npm run frontend:dev
```

### 4. Access the Application

- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:3001

## 📁 Project Structure

```
todo-app/
├── src/                    # Backend source code
│   ├── todo/              # Todo module
│   │   ├── todo.controller.ts
│   │   ├── todo.service.ts
│   │   ├── todo.schema.ts
│   │   └── todo.module.ts
│   ├── shared/            # Shared utilities
│   ├── app.module.ts      # Main app module
│   └── main.ts           # Application entry point
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── package.json
├── docker-compose.yml     # Docker configuration
├── Dockerfile            # Backend Dockerfile
└── package.json          # Root package.json
```

## 🔧 Available Scripts

### Root Directory (Backend + Frontend)

```bash
npm run dev              # Start both services
npm run install:all      # Install all dependencies
npm run frontend:dev     # Start frontend only
npm run frontend:build   # Build frontend
npm run frontend:start   # Start frontend production
```

### Backend Only

```bash
npm run start:dev        # Start backend in development mode
npm run build            # Build backend
npm run start:prod       # Start backend in production mode
npm run test             # Run backend tests
```

### Frontend Only

```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

## 🐳 Docker Setup

### Run with Docker Compose

```bash
# Start the entire application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Build Individual Images

```bash
# Build backend
docker build -t todo-backend .

# Build frontend
cd frontend
docker build -t todo-frontend .
```

## 🌐 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/todos`     | Get all todos   |
| GET    | `/todos/:id` | Get todo by ID  |
| POST   | `/todos`     | Create new todo |
| PUT    | `/todos/:id` | Update todo     |
| DELETE | `/todos/:id` | Delete todo     |

### Example API Usage

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS", "description": "Build a todo app"}'

# Get all todos
curl http://localhost:3000/todos

# Update a todo
curl -X PUT http://localhost:3000/todos/:id \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": "true"}'
```

## 🎨 Frontend Features

- **Create Todo**: Add new todos with title and description
- **Edit Todo**: Inline editing for title and description
- **Toggle Completion**: Mark todos as complete/incomplete
- **Delete Todo**: Remove todos with confirmation
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Instant UI updates after operations

## 🔒 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/todo-app
PORT=3000
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testing

### Backend Testing

```bash
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage report
```

### Frontend Testing

```bash
cd frontend
npm run test              # Run tests
npm run test:watch        # Watch mode
```

## 🚀 Deployment

### Backend Deployment

- Build the application: `npm run build`
- Deploy to your preferred hosting platform
- Set environment variables for production

### Frontend Deployment

- Build the application: `npm run frontend:build`
- Deploy to Vercel, Netlify, or any static hosting platform
- Update `NEXT_PUBLIC_API_URL` to point to your production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000 and 3001 are available
2. **MongoDB Connection**: Verify your MongoDB URI is correct
3. **Dependencies**: Run `npm run install:all` to install all dependencies
4. **Environment Variables**: Check that all required environment variables are set

### Getting Help

- Check the console for error messages
- Verify your MongoDB connection
- Ensure all environment variables are properly configured
- Check that both services are running on the correct ports

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Search and filtering
- [ ] Dark mode theme
- [ ] Offline support
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)

---

Built with ❤️ using NestJS and Next.js
