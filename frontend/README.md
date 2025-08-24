# Todo App Frontend

A modern, responsive Next.js frontend for the Todo application that integrates with the NestJS backend.

## Features

- ✨ **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📝 **CRUD Operations**: Create, read, update, and delete todos
- ✅ **Toggle Completion**: Mark todos as complete/incomplete
- 🔄 **Real-time Updates**: Instant UI updates after operations
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 🎨 **Smooth Animations**: Hover effects and transitions

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for beautiful icons
- **React Hooks** for state management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- The NestJS backend running on `http://localhost:3000`

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## API Integration

The frontend communicates with the NestJS backend through the following endpoints:

- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch single todo
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main todo page
│   └── globals.css     # Global styles
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # Todo management hook
├── services/           # API services
│   └── api.ts         # Todo API client
└── types/              # TypeScript types
    └── todo.ts         # Todo interfaces
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize colors, spacing, and other design tokens in `tailwind.config.ts`.

### API Configuration
Update the `NEXT_PUBLIC_API_URL` in your `.env.local` file to point to your backend server.

## Deployment

The app can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

Build the app:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Todo App full-stack application.
