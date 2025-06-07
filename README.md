# Smart Finance Tracker

A comprehensive finance tracking application that helps users manage their expenses, track income, and make informed financial decisions. Built with React frontend and Node.js backend.

## Live Demo

Visit the deployed application at: [Smart Finance Tracker](https://smart-finance-tracker-1.onrender.com/)

## Features

- 📊 Interactive Dashboard with Expense Analytics
- 💰 Income and Expense Tracking
- 📈 Visual Charts and Reports
- 🔐 Secure User Authentication
- 📱 Responsive Design
- 🔄 Real-time Data Updates
- 📧 Email Notifications
- 🔍 Transaction Search and Filtering

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer
- Bcrypt

## Project Structure

```
smart-finance-tracker/
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
├── backend/          # Node.js/Express backend server
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── package.json  # Backend dependencies
└── LICENSE          # MIT License file
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or Atlas)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AnishGane/Smart-Finance-Tracker.git
   cd smart-finance-tracker
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:

   Frontend (.env):
   ```
   VITE_BACKEND_URL=your_backend_url
   ```

   Backend (.env):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

4. Start development servers:
   ```bash
   # Start backend server
   cd backend
   npm run server

   # Start frontend server (in a new terminal)
   cd frontend
   npm run dev
   ```

## Deployment

The project is configured for deployment on Render:

1. Frontend (Static Site):
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables: Set `VITE_BACKEND_URL` to your backend URL

2. Backend (Web Service):
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Set all required environment variables

## API Endpoints

### Authentication
- POST `/api/user/register` - Register new user
- POST `/api/user/login` - User login
- GET `/api/user/verify-token` - Verify authentication token

### Transactions
- GET `/api/transactions/all` - Get all transactions
- POST `/api/transactions/add` - Add new transaction
- PUT `/api/transactions/update/:id` - Update transaction
- DELETE `/api/transactions/delete/:id` - Delete transaction

### Charts
- GET `/api/chart/data` - Get chart data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Anish Gane**
- GitHub: [@AnishGane](https://github.com/AnishGane)