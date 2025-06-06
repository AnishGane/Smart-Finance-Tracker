# Smart Finance Tracker

A comprehensive financial management application built with React and Node.js, featuring transaction tracking, data visualization, and user authentication.

## Features

- 📊 Interactive financial dashboards and charts
- 💰 Transaction management and tracking
- 🔐 Secure user authentication
- 📱 Responsive design for all devices
- 📈 Real-time data visualization
- 🎯 Budget tracking and management
- 📝 Category-based expense organization

## Tech Stack

### Frontend
- React 19
- React Router v7
- Chart.js & React-ChartJS-2
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/AnishGane/smart-finance-tracker.git
cd smart-finance-tracker
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Environment Setup

Frontend (.env in frontend directory):
```env
VITE_BACKEND_URL=yourbackendlocalhosturl
```

Backend (.env in backend directory):
```env
PORT=yourport
MONGODB_URI=yourmongodbstring
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_TO=your_email@gmail.com
```

5. Start the development servers

Backend:
```bash
cd backend
npm run server
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Building for Production

1. Build the frontend
```bash
cd frontend
npm run build
```

2. Build the backend
```bash
cd backend
npm run build
```

## Project Structure

### Frontend
```
frontend/
├── public/              # Static files
├── src/                # Source code
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   └── App.js         # Main application component
├── package.json        # Project metadata and dependencies
└── vite.config.js     # Vite configuration
```

### Backend
```
backend/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── middleware/        # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── package.json      # Project metadata
└── server.js         # Main application file
```

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/forgot-password` - Password recovery
- `POST /api/user/reset-password` - Password reset

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Charts
- `GET /api/chart/data` - Get comprehensive chart data
  - Requires authentication
  - Returns:
    - Line chart data (time-series income and expenses)
    - Bar chart data (comparative income and expenses)
    - Doughnut chart data (income vs expenses summary)
    - Financial summary (total income, expenses, and net balance)
  - Response includes:
    - Success status
    - Chart datasets with labels and styling
    - Summary statistics
    - No data message if no transactions exist

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend
- `npm run server` - Start development server
- `npm run build` - Build for production

## Author

👤 **Anish Gane**

- GitHub: [@AnishGane](https://github.com/AnishGane)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@smartfinancetracker.com or open an issue in the repository.
