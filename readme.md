## Appointment Mini App

### Introduction

This project is a simple full-stack appointment mini program built with **Taro + Spring Boot**, designed to demonstrate basic full-stack development skills, including authentication, appointment creation, idempotency handling, and frontend-backend integration.

The system supports user login, appointment creation, and appointment query, and is developed according to the requirements of the coding challenge.

---

### Tech Stack

#### Frontend
- Taro
- TypeScript
- React
- WeChat Mini Program

#### Backend
- Java 21
- Spring Boot 3.x
- MyBatis-Plus
- MySQL
- JWT Authentication

#### Build Tools
- Gradle
- Node.js
- pnpm

---

### Environment Requirements

Please make sure the following environment is installed before running the project:

| Component | Version |
|-----------|----------|
| JDK       | 21       |
| MySQL     | 5.7+     |
| Gradle    | 8.x+     |
| Node.js   | 18+      |
| pnpm      | 8+       |

---

### Project Structure

mini_app/
├── mini_app_backend/ # Spring Boot backend service
├── mini_app_front/ # Taro mini program
├── README.md


### Backend Setup
#### 1. Enter backend directory

```bash
cd mini_app_backend
```
#### 2. Configure database
Edit application.yml:

```yaml
spring:
  datasource:
    url: jdbc:mysql://{your_db_host}:port/mini_app?useUnicode=true&characterEncoding=utf-8&useSSL=false&autoReconnect=true
    username: your_username
    password: your_password
```

#### 3. Initialize database
```bash
cd mini_app/mini_app_backend/sql
mysql -u your_username -p mini_app < init.sql
```

#### 4. Run backend service
```bash
./gradlew bootRun
```

The backend service will start at: `http://host:19090`


### Frontend Setup
#### 1. Enter frontend directory

```bash
cd mini_app/mini_app_front
```


#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Start development mode
```bash
pnpm dev:weapp
```


#### 4. Open WeChat Developer Tools
Import the project:
mini_app/mini_app_front