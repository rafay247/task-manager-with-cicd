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

## GitHub Flow

This project follows a standard GitHub Flow to ensure code quality and stable releases:

1.  **Branching:** Always create a new branch from `develop` for features or bug fixes (e.g., `feature/add-auth`).
2.  **Commits:** Commit your changes with descriptive messages.
3.  **Pull Request (PR):** Open a PR targeting the `develop` branch.
4.  **CI Validation:** The **CI Pipeline** automatically runs tests and builds the Docker image for every PR.
5.  **Review & Merge:** Once tests pass and code is reviewed, merge the PR into `develop`.
6.  **Release:** Periodically merge `develop` into `main` to trigger the **CD Pipeline** for production releases.

## CI/CD Pipeline

The CI/CD pipeline is automated using GitHub Actions.

### 1. CI Pipeline (`ci.yml`) - Runs on Push/PR to `main` and `develop`
-   **Test Job:**
    -   Runs on multiple Node.js versions (16, 18, 20).
    -   Installs dependencies and runs the linter.
    -   Executes unit and integration tests.
    -   Generates and uploads code coverage reports.
-   **Build Job (requires Test Job to pass):**
    -   Builds the Docker image.
    -   Performs a "Smoke Test" by starting the container and checking the `/health` endpoint.

### 2. CD Pipeline (`cd.yml`) - Runs on Push to `main` or Tags (`v*`)
-   **Deploy Job:**
    -   Builds the production Docker image.
    -   Saves the image as a tarball artifact.
    -   Packages the `docker-compose.yml` and a specific `.env` (with the commit SHA) for deployment.
    -   Uploads a `deployment-package` artifact ready for transport to the target server.

### How it runs every time?
GitHub Actions uses **Triggers** (the `on` block in YAML files). 
-   **CI** triggers on `push` and `pull_request` events, meaning every time you push code to GitHub or create a PR, GitHub spins up a virtual machine (Ubuntu) to execute the defined jobs.
-   **CD** triggers only on `push` specifically to `main`, ensuring that only verified code from `develop` that has been merged into `main` gets packaged for production.
