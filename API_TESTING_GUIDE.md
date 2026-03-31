# API Testing Guide with Postman

## Prerequisites
1. Start the backend server: `cd backend && uvicorn main:app --reload --port 8001`
2. Ensure the database is initialized

## Authentication Flow

### 1. Register a New User
- **Method**: POST
- **URL**: `http://localhost:8001/users`
- **Headers**: 
  - Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "bio": "Test user bio",
  "avatar": "",
  "postsCount": 0,
  "followersCount": 0,
  "followingCount": 0
}
```

### 2. Authenticate User (Get JWT Token)
- **Method**: POST
- **URL**: `http://localhost:8001/users/authenticate`
- **Headers**: 
  - Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "username": "testuser",
  "password": "password123"
}
```
- **Expected Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "username": "testuser",
    ...
  }
}
```

### 3. Access Protected Endpoints
- After getting the token, you can access protected endpoints by adding the Authorization header:
  - **Header**: `Authorization: Bearer <your-jwt-token>`
- Example - Get user info: `GET http://localhost:8001/users/{user_id}`

### 4. Test Other Endpoints
Most endpoints require authentication. Add the Authorization header to access them:
- `GET /posts`
- `POST /posts`
- `PUT /posts/{post_id}`
- `DELETE /posts/{post_id}`
- etc.

## Troubleshooting
- Make sure the backend server is running on port 8001
- Check the server logs for any errors
- Verify that the SECRET_KEY is set in the .env file
- Ensure the database connection is working properly