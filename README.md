# Task Manager API

A simple Node.js Task Manager API with a complete CI/CD pipeline setup.

## Features
- CRUD operations for tasks
- Unit and Integration tests using Jest and Supertest
- Docker support
- CI/CD workflows with GitHub Actions

## Tech Stack
- **Backend:** Node.js, Express
- **Testing:** Jest, Supertest
- **DevOps:** Docker, GitHub Actions

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (optional)

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd task-manager-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

### Running the Application
- Development: `npm run dev`
- Production: `npm start`
- Docker: `docker-compose up`

### Running Tests
- All tests: `npm test`

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a task by ID
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
