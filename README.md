# Smart Finance Tracker

A comprehensive finance tracking application with a React frontend and Node.js backend.

## Project Structure

```
smart-finance-tracker/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend server
└── LICENSE           # MIT License file
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-finance-tracker
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Frontend: Create `.env` file in `frontend/` directory
   - Backend: Create `.env` file in `backend/` directory

4. Start development servers:
   ```bash
   npm run dev
   ```

## Deployment

The project is configured for deployment on Render:

1. Frontend (Static Site):
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

2. Backend (Web Service):
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

## Environment Variables

### Frontend (.env)
```
VITE_BACKEND_URL=yourbackendurl
```

### Backend (.env)
```
PORT=anyport
NODE_ENV=development
```

## License

MIT License - see LICENSE file for details

## Author

Anish Gane