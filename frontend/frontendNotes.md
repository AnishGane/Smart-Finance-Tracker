# Frontend Documentation

## Project Structure
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

## Core Components

### 1. Application Setup (`App.js`)
- React Router setup
- Context providers
- Global styles
- Layout components
- Route definitions

### 2. Pages (`pages/`)
- `LandingPage.jsx`: Main landing page with app introduction
- `Home.jsx`: Dashboard and main financial overview
- `Chart.jsx`: Financial data visualization and analytics
- `Login.jsx`: User authentication
- `ForgotPassword.jsx`: Password recovery flow
- `ResetPassword.jsx`: Password reset functionality
- `Contact.jsx`: Contact form and support
- `About.jsx`: About page with project information

### 3. Components (`components/`)
- `Layout.jsx`: Main layout wrapper component
- `Navbar.jsx`: Navigation bar with user menu
- `Dashboard.jsx`: Dashboard overview component
- `TransactionForm.jsx`: Form for adding/editing transactions
- `TransactionList.jsx`: List display of transactions
- `RevenueCard.jsx`: Financial summary card component
- `CategorySummary.jsx`: Category-wise expense breakdown
- `Loading.jsx`: Loading state component
- `AlertMessage.jsx`: Alert/notification component
- `ProtectedRoute.jsx`: Route protection for authenticated users

### 4. Context (`context/`)
- `FinanceContext.js`: Global financial state management
  - Transaction data
  - Financial metrics
  - Budget information
  - Category management

## Key Features

### Authentication
- User registration
- Login/Logout
- Password reset
- Protected routes
- Session management

### Transaction Management
- Add transactions
- View transaction history
- Edit transactions
- Delete transactions

### Data Visualization
- Financial overview charts
- Category breakdown
- Time-series analysis
- Interactive charts
- Responsive design

### User Interface
- Responsive layout
- Loading states
- Error handling
- Form validation

## Dependencies
Key dependencies:
- React: UI library
- React Router: Navigation
- Axios: HTTP client
- Chart.js: Data visualization
- Tailwind CSS: Styling
- React Hot Toastify: Toast notifications
- React ChartJS-2: Chart components
- React Icons: Icon library for React components

## State Management
- React Context for global state
- Local state for component-specific data
- Form state management

## Styling
- Tailwind CSS for utility-first styling
- Custom CSS modules
- Responsive design
- Component-specific styles

## Development
To start the development server:
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Component Architecture

### Transaction Components
- Form validation
- Real-time updates
- Error handling
- Loading states
- Success feedback

### Chart Components
- Data transformation
- Responsive design
- Interactive features
- Color schemes
- Tooltips and legends

### Authentication Components
- Form validation
- Error messages
- Loading states
- Success redirects
- Session management

## API Integration
- Axios instance configuration
- Request/Response interceptors
- Error handling
- Authentication headers
- API endpoint constants
