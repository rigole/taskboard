# Task Management Board - Full Stack Project

A modern, production-ready task management application built with **React 18** (frontend) and **Spring Boot 3** (backend). Perfect for showcasing full-stack development skills to potential employers.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

This is an **Advanced Task Management Board** - similar to Asana, Trello, or Monday.com but built from scratch. It's designed as a **portfolio project** to demonstrate:

✨ **Modern React patterns** (hooks, state management, components)
✨ **Solid backend architecture** (Spring Security, JPA, REST APIs)
✨ **Full-stack development** (database design, API design, UI/UX)
✨ **Production-ready code** (error handling, validation, testing)

---

## ✨ Features

### Core Features

- ✅ User authentication (signup/login with JWT)
- ✅ Create and manage boards
- ✅ Kanban-style columns (To Do, In Progress, Done)
- ✅ Drag-and-drop tasks between columns
- ✅ Create/edit/delete tasks
- ✅ Task details modal

### Advanced Features

- ✅ Task assignment to users
- ✅ Task priority levels (Low, Medium, High)
- ✅ Due dates for tasks
- ✅ Comments on tasks
- ✅ Real-time search and filtering
- ✅ Task statistics dashboard
- ✅ Role-based access control (Admin, User)

### Polish Features

- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support
- ✅ Activity history/timeline
- ✅ User avatars and profiles
- ✅ Email notifications (optional)
- ✅ Performance optimization
- ✅ Comprehensive testing

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Purpose             | Version |
| ----------------- | ------------------- | ------- |
| **React**         | UI framework        | 18.x    |
| **Redux/Zustand** | State management    | Latest  |
| **Axios**         | HTTP client         | Latest  |
| **dnd-kit**       | Drag-and-drop       | Latest  |
| **React Router**  | Client-side routing | 6.x     |
| **Tailwind CSS**  | Styling             | 4.x     |
| **Vite**          | Build tool          | Latest  |

### Backend

| Technology          | Purpose              | Version |
| ------------------- | -------------------- | ------- |
| **Spring Boot**     | Web framework        | 3.2.0   |
| **Spring Security** | Authentication       | Latest  |
| **Spring Data JPA** | ORM                  | Latest  |
| **PostgreSQL**      | Database             | 12+     |
| **JWT (JJWT)**      | Token authentication | 0.12.3  |
| **Flyway**          | Database migrations  | Latest  |
| **Maven**           | Build tool           | 3.8+    |

### Development Tools

| Tool                 | Purpose                     |
| -------------------- | --------------------------- |
| **Git**              | Version control             |
| **Docker**           | Containerization (optional) |
| **Postman/Insomnia** | API testing                 |
| **VS Code**          | Code editor                 |
| **IntelliJ IDEA**    | Java IDE (optional)         |

---

## 📁 Project Structure

```
task-management-board/
│
├── backend/                          # Spring Boot backend
│   ├── pom.xml                      # Maven dependencies
│   ├── src/
│   │   ├── main/java/com/taskboard/
│   │   │   ├── TaskboardApplication.java
│   │   │   ├── config/              # Configuration classes
│   │   │   ├── entity/              # JPA entities
│   │   │   ├── repository/          # Data access layer
│   │   │   ├── service/             # Business logic
│   │   │   ├── controller/          # REST endpoints
│   │   │   ├── security/            # JWT & Security
│   │   │   ├── dto/                 # Data transfer objects
│   │   │   └── exception/           # Error handling
│   │   ├── resources/
│   │   │   ├── application.yml      # Configuration
│   │   │   └── db/migration/        # Flyway migrations
│   │   └── test/
│   └── README.md
│
├── frontend/                         # React frontend
│   ├── package.json                 # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── src/
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # Entry point
│   │   ├── pages/                   # Page components
│   │   ├── components/              # Reusable components
│   │   ├── store/                   # State management (Redux/Zustand)
│   │   ├── services/                # API services
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Utility functions
│   │   ├── styles/                  # Global styles
│   │   └── index.css
│   ├── public/                      # Static assets
│   └── README.md
│
├── docs/                            # Documentation
│   ├── API.md                       # API documentation
│   ├── DATABASE.md                  # Database schema
│   ├── ARCHITECTURE.md              # Architecture overview
│   └── SETUP.md                     # Setup guide
│
├── .gitignore
├── README.md                        # This file
└── LICENSE
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Java 17+**

  ```bash
  java -version
  ```

- **Maven 3.8+**

  ```bash
  mvn -version
  ```

- **Node.js 16+** (with npm or yarn)

  ```bash
  node --version
  npm --version
  ```

- **PostgreSQL 12+**

  ```bash
  psql --version
  ```

- **Git**
  ```bash
  git --version
  ```

### Optional but Recommended

- **Docker** (for containerized development)
- **Postman/Insomnia** (for API testing)
- **VS Code** or **IntelliJ IDEA** (code editors)

---

## 🚀 Quick Start

## 🔧 Backend Setup

### Detailed Backend Instructions

#### Step 1: Generate Project (using Spring Initializr)

Visit **https://start.spring.io/** and configure:

- **Project:** Maven
- **Language:** Java
- **Spring Boot:** 3.2.0+
- **Java:** 17+
- **Group:** com.taskboard
- **Artifact:** taskboard-api

**Dependencies to add:**

- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- Spring Boot DevTools
- Validation
- Flyway Migration
- Spring Security Test

Click **Generate** and extract the ZIP file.

#### Step 2: Configure Database

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/taskboard_db
    username: taskboard_user
    password: taskboard_pass
  jpa:
    hibernate:
      ddl-auto: validate
```

#### Step 3: Add JWT Secret

In `application.yml`, add:

```yaml
jwt:
  secret: your-super-secret-key-at-least-32-characters-long
  expiration: 900000
  refresh-expiration: 604800000
```

#### Step 4: Build & Run

```bash
mvn clean install
mvn spring-boot:run
```

#### Step 5: Verify

```bash
curl http://localhost:8080/api/auth
# Should return 401 Unauthorized
```

### Backend API Endpoints

Base URL: `http://localhost:8080/api`

**Authentication:**

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout user

**Boards:**

- `GET /boards` - Get all user's boards
- `GET /boards/{id}` - Get board details
- `POST /boards` - Create board
- `PUT /boards/{id}` - Update board
- `DELETE /boards/{id}` - Delete board

**Columns:**

- `GET /boards/{boardId}/columns` - Get columns
- `POST /boards/{boardId}/columns` - Create column
- `PUT /columns/{id}` - Update column
- `DELETE /columns/{id}` - Delete column

**Tasks:**

- `GET /columns/{columnId}/tasks` - Get tasks
- `POST /columns/{columnId}/tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task
- `PATCH /tasks/{id}/move` - Move task between columns
- `GET /tasks?search=...&priority=...` - Search tasks

**Comments:**

- `GET /tasks/{taskId}/comments` - Get comments
- `POST /tasks/{taskId}/comments` - Add comment
- `PUT /comments/{id}` - Update comment
- `DELETE /comments/{id}` - Delete comment

---

## 🎨 Frontend Setup

### Detailed Frontend Instructions

#### Step 1: Create React Project with Vite

```bash
npm create vite@latest taskboard-frontend -- --template react
cd taskboard-frontend
npm install
```

#### Step 2: Install Dependencies

```bash



npm install axios


npm install react-router-dom


npm install react-beautiful-dnd


npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


npm install @headlessui/react @heroicons/react
```

#### Step 3: Project Structure

Create the following structure in `src/`:

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── Board/
│   │   ├── KanbanBoard.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   ├── Task/
│   │   ├── TaskModal.jsx
│   │   ├── CommentSection.jsx
│   │   └── TaskForm.jsx
│   └── Common/
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── Loader.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProfilePage.jsx
│   └── LoginPage.jsx
├── store/
│   ├── authStore.ts
│   ├── boardStore.ts
│   └── taskStore.ts
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── boardService.ts
│   └── taskService.ts
├── hooks/
│   ├── useAuth.js
│   └── useFetchBoard.js
├── utils/
│   ├── constants.ts
│   └── helpers.ts
├── App.jsx
├── main.jsx
└── index.css
```

#### Step 4: Set API Base URL

Create `src/utils/constants.js`:

```javascript
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
```

#### Step 5: Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 📊 Database Schema

### Tables Overview

**users**

- Stores user accounts
- Fields: id, email, password, name, role, created_at, updated_at

**boards**

- Stores task boards owned by users
- Fields: id, name, description, owner_id, created_at, updated_at

**board_columns**

- Stores columns within boards (To Do, In Progress, Done)
- Fields: id, board_id, name, position, created_at, updated_at

**tasks**

- Stores tasks within columns
- Fields: id, column_id, title, description, assignee_id, priority, due_date, position, created_by, created_at, updated_at

**comments**

- Stores comments on tasks
- Fields: id, task_id, author_id, content, created_at, updated_at

See `docs/DATABASE.md` for detailed schema.

---

## 🔐 Authentication

### How It Works

1. **User Signs Up**
   - Sends email, password, name to `/auth/signup`
   - Backend hashes password with BCrypt
   - Creates user in database
   - Returns JWT access token + refresh token

2. **User Logs In**
   - Sends email, password to `/auth/login`
   - Backend verifies credentials
   - Returns JWT tokens

3. **API Requests**
   - Frontend sends JWT in Authorization header: `Bearer {token}`
   - Backend validates JWT
   - Allows/denies request

4. **Token Refresh**
   - Access token expires after 15 minutes
   - Use refresh token to get new access token
   - No need to login again

### JWT Claims

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "username": "user-name",
  "iat": 1234567890,
  "exp": 1234568790
}
```

---

## 💻 Development

### Running in Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 3 - Database (optional):**

```bash
psql -U taskboard_user -d taskboard_db
```

### Testing API Endpoints

Using **Postman** or **Insomnia**:

1. **Sign Up**

   ```
   POST http://localhost:8080/api/auth/signup
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login**

   ```
   POST http://localhost:8080/api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Create Board** (requires Authorization header)

   ```
   POST http://localhost:8080/api/boards
   Authorization: Bearer {access_token}
   Content-Type: application/json

   {
     "name": "My Project",
     "description": "Project description"
   }
   ```

### Code Formatting

**Backend:**

```bash
mvn spotless:apply
```

**Frontend:**

```bash
npm run format
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend


mvn test

mvn test -Dtest=AuthControllerTest

mvn test jacoco:report
```

### Frontend Tests

```bash
cd frontend


npm run test

e
npm run test:coverage

npm run cypress:open
```

---

## 🚢 Deployment

### Backend Deployment

#### Docker Deployment

1. **Create Dockerfile:**

   ```dockerfile
   FROM openjdk:17-jdk-slim
   COPY target/taskboard-api-1.0.0.jar app.jar
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

2. **Build & Run:**
   ```bash
   mvn clean package -DskipTests
   docker build -t taskboard-api .
   docker run -p 8080:8080 taskboard-api
   ```

#### Cloud Deployment

- **Heroku:** Push to Heroku with Procfile
- **AWS:** Deploy to Elastic Beanstalk
- **DigitalOcean:** Use App Platform or Droplet
- **Railway:** Simple git push deployment

### Frontend Deployment

#### Netlify/Vercel

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy:**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

#### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### Environment Variables

**Backend (.env or application-prod.yml):**

```
DATABASE_URL=jdbc:postgresql://prod-db:5432/taskboard
JWT_SECRET=production-secret-key
SPRING_PROFILE=production
```

**Frontend (.env.production):**

```
VITE_API_URL=https://api.yourdomain.com
```

---

## 📖 Additional Documentation

- **API Documentation:** See `docs/API.md`
- **Database Schema:** See `docs/DATABASE.md`
- **Architecture:** See `docs/ARCHITECTURE.md`
- **Setup Guide:** See `docs/SETUP.md`

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow REST API conventions
- Use meaningful commit messages
- Write unit tests for new features
- Update documentation

---

## 📋 Checklist for Portfolio

- [x] Clean code without hardcoded values
- [x] Comprehensive error handling
- [x] Input validation on frontend & backend
- [x] JWT authentication working
- [x] Database migrations in place
- [x] All CRUD operations implemented
- [ ] Drag-and-drop functionality
- [ ] Search/filter features
- [ ] Responsive design
- [ ] API documentation
- [ ] README with setup instructions
- [ ] Tests (at least 50% coverage)
- [ ] Git history with meaningful commits
- [ ] Deployed version accessible
- [ ] Live demo video

---

## 📸 Screenshots

(Add screenshots of your application here)

---

## 🎓 Learning Outcomes

By completing this project, you'll have learned:

**Frontend:**

- React hooks and state management
- Component composition
- API integration with Axios
- Routing and navigation
- Drag-and-drop implementation
- Responsive design with Tailwind CSS
- Form validation

**Backend:**

- Spring Boot REST APIs
- Spring Security with JWT
- Database design and JPA
- Service-oriented architecture
- Exception handling
- Input validation
- Database migrations

**Full-Stack:**

- Authentication flow
- Request/response handling
- CORS configuration
- Error handling across layers
- Testing strategies
- Deployment processes

---

## 📞 Support

For questions or issues:

1. Check existing documentation
2. Search GitHub issues
3. Create a new issue with details
4. Contact project maintainer

---

## 📄 License

This project is licensed under the MIT License - see `LICENSE` file for details.

---

## 🙏 Acknowledgments

- Spring Boot documentation
- React official guides
- PostgreSQL documentation
- JWT best practices
- Icons from Heroicons

---

## 🎯 Project Status

**Current Phase:** Boilerplate Complete

- [x] Backend structure
- [x] Database schema
- [x] Security setup
- [x] API endpoints (create controllers & services)
- [x] Frontend components
- [x] Integration
- [x] Testing
- [ ] Deployment

---

## 👨‍💻 Author

**Placide FOLEU**

- LinkedIn: [linkedin.com/in/placide-rigole-foleu](https://www.linkedin.com/in/placide-rigole-foleu/)
- GitHub: [@rigole](https://github.com/rigole)
- Email: foplacide@gmail.com

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with passion using Spring Boot · Angular · PostgreSQL</p>
