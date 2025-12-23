# SecureAuth

A full-stack authentication application with role-based access control, built with Node.js, Express, MongoDB, React, and TypeScript.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT (JSON Web Tokens)**: For authentication
- **bcryptjs**: Password hashing
- **Nodemailer**: Email sending
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Frontend
- **React**: UI library
- **TypeScript**: Typed JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library (built on Radix UI)
- **Redux Toolkit**: State management
- **React Query**: Data fetching and caching
- **Axios**: HTTP client

## Features

- **User Authentication**: Signup, login, logout
- **Email Verification**: Verify user accounts via email
- **Password Reset**: Forgot password functionality with email reset links
- **Role-Based Access Control**: Separate dashboards for Admin and Student roles
- **Profile Management**: View and update user profile
- **Change Password**: Secure password update functionality
- **Responsive Design**: Mobile-friendly UI with dark/light theme toggle
- **Protected Routes**: Route protection based on authentication and roles

## Usage

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Email service (for sending verification and reset emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ken314526/SecureAuth.git
   cd SecureAuth
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following variables as mentioned in `.env.sample`:
   ```
    MONGO_URI=your-mongodb-server-link
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRY=1d
    TOKEN_BITS=32
    TOKEN_EXPIRY_MiNUTES=15
    CLIENT_URL=http://localhost:8080
    EMAIL_HOST=sandbox.smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_USER=your-mail-username
    EMAIL_PASS=your-mail-password
    PORT=5000
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

    Create a `.env` file in the `frontend` directory with the following variables as mentioned in `.env.sample`:
   ```
    VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Access the Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

### API Endpoints

- **Authentication**: `/api/auth`
  - POST `/signup` - User registration
  - POST `/login` - User login
  - POST `/verify-email` - Email verification
  - POST `/forgot-password` - Request password reset
  - POST `/reset-password` - Reset password

- **Admin**: `/api/admin` (Admin role required)
- **Student**: `/api/student` (Student role required)
