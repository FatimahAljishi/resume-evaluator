# Resume Evaluator https://resume-evaluator-by-fatimah.vercel.app/

## Overview

Resume Evaluator is a full-stack web application that helps users evaluate their resumes against a job description using AI. Users can upload a resume, provide a job description, and receive detailed feedback on how well their resume matches the role, including strengths, gaps, and overall recommendation.

The project was built as part of a software development bootcamp using React, FastAPI, SQLModel, SQLite, JWT authentication, and the OpenAI API.

---

## Features

### User Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing and verification
* Protected routes
* Token expiration support

### Resume Evaluation

* Upload resume files (PDF)
* Enter a job description
* Optional custom prompt
* AI-powered resume analysis
* Match score evaluation
* Identification of strengths
* Identification of skill gaps
* Overall recommendation

### Admin Panel

* View all registered users
* Promote users to admin
* Delete users
* Role-based access control
* Protected admin endpoints

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* FastAPI
* SQLModel
* SQLite
* Pydantic
* JWT Authentication
* PyPDF

### AI

* OpenAI API
* GPT-4.1 Mini

---

## Project Structure

```text
resume-evaluator/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
|   |   ├── App.css
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── auth_utils.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── llm.py
│   ├── pdf_utils.py
│   └── resume_evaluator.db
│
└── README.md
```

---

## Installation

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the environment:

Windows Git Bash:

```bash
source .venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

---

### Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /auth/register
```

#### Login

```http
POST /auth/login
```

#### Current User

```http
GET /auth/me
```

---

### Resume Evaluation

#### Evaluate Resume

```http
POST /evaluate
```

Request fields:

* job_description
* prompt (optional)
* resume (PDF file)

---

### Admin

#### List Users

```http
GET /admin/users
```

#### Update User Role

```http
PATCH /admin/users/{email}/role
```

#### Delete User

```http
DELETE /admin/users/{email}
```

---

## Database

The application uses SQLite with SQLModel.

Main user fields:

* id
* email
* hashed_password
* role

Roles:

* user
* admin

---

## Security

* Passwords are hashed before storage.
* JWT tokens are used for authentication.
* Tokens expire after one hour.
* Admin endpoints require admin privileges.
* Protected frontend routes restrict access to authenticated users.

---

## Author

Fatimah Aljishi

Bootcamp Project – Resume Evaluator
