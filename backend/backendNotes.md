# Backend Documentation

## Project Structure
```
backend/
├── config/                 # Configuration files
├── controllers/           # Request handlers
├── Middleware/           # Custom middleware
├── models/               # Database models
├── routes/               # API routes
├── node_modules/         # Dependencies
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Dependency lock file
└── server.js            # Main application file
```

## Core Components

### 1. Server Configuration (`server.js`)
- Express server setup
- Middleware configuration (CORS, JSON parsing)
- Database connection
- Email configuration verification
- API route registration
- Health check endpoint
- Server startup on port 5000

### 2. API Routes (`routes/`)
- `userRoute.js`: User authentication and management
- `transactionRoute.js`: Transaction CRUD operations
- `chartRoutes.js`: Data visualization endpoints
- `emailRoutes.js`: Email-related endpoints (password reset, contact)

### 3. Controllers (`controllers/`)
- `userController.js`: User authentication and management logic
- `transactionController.js`: Transaction management logic
- `chartController.js`: Data aggregation and chart data preparation
- `emailController.js`: Email sending and verification logic

### 4. Database Models (`models/`)
- `userModel.js`: User schema and model
- `transactionModel.js`: Transaction schema and model

### 5. Middleware (`Middleware/`)
- `auth.js`: Authentication middleware
- `validation.js`: Request validation middleware
- `errorHandler.js`: Global error handling middleware

### 6. Configuration (`config/`)
- `connectDB.js`: MongoDB connection configuration
- `emailConfig.js`: Email service configuration

## API Endpoints

### User Routes (`/api/user`)
- Registration
- Login
- Password reset
- User profile management

### Transaction Routes (`/api/transactions`)
- Create transaction
- Read transactions
- Update transaction
- Delete transaction
- Get transaction statistics

### Chart Routes (`/api/chart`)
- Get financial overview data
- Get category-wise breakdown
- Get time-series data

### Email Routes (`/api`)
- Contact form submission
- Password reset email
- Email verification

## Environment Variables
Required environment variables:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT token secret
- `EMAIL_USER`: Email service username
- `EMAIL_PASS`: Email service password

## Dependencies
Key dependencies:
- Express.js: Web framework
- MongoDB: Database
- Mongoose: ODM for MongoDB
- JWT: Authentication
- Nodemailer: Email service
- CORS: Cross-origin resource sharing
- Dotenv: Environment variable management

## Error Handling
- Global error handling middleware
- Custom error responses
- Validation error handling
- Authentication error handling

## Security Features
- JWT authentication
- Password hashing
- Input validation
- CORS protection
- Rate limiting
- Secure headers

## Development
To start the development server:
1. Install dependencies: `npm install`
2. Set up environment variables
3. Start server: `npm run server`

## Email Configuration Logic

The `emailConfig.js` file implements a robust email service configuration using Nodemailer. Here's a breakdown of the key logic:

### 1. Environment Variable Validation
- Checks for required email configuration variables (`EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`)
- Provides clear error messages if any variables are missing
- Exits the application if configuration is incomplete

### 2. Transporter Configuration
- Creates a secure SMTP transporter using Gmail's SMTP server
- Uses SSL/TLS encryption (port 465)
- Configures authentication using environment variables
- Implements secure connection settings

### 3. Connection Verification
- Implements a singleton pattern for verification using `isVerified` flag
- Verifies SMTP connection only once at startup
- Provides detailed error messages for common configuration issues:
  - Gmail security settings
  - Credential validation
  - Password requirements

### 4. Error Handling
- Comprehensive error logging for connection issues
- Clear troubleshooting instructions
- Graceful application termination on critical errors

### 5. Security Considerations
- Uses environment variables for sensitive data
- Implements secure SMTP connection
- Validates configuration before allowing email operations

This configuration ensures reliable email service setup with proper error handling and security measures.

## Email Controller Logic

The `emailController.js` implements a comprehensive email service with several key features:

### 1. Email Service Core Functions
- `sendEmail`: Handles email transmission using configured transporter
- `generateResetToken`: Creates secure random tokens for password reset
- `storeResetToken`: Manages token storage with expiration
- `validateResetToken`: Verifies token validity and expiration
- `removeResetToken`: Cleans up used tokens

### 2. Contact Form Handler
- Processes contact form submissions
- Formats email content with user details
- Sends structured HTML emails
- Implements error handling and response formatting

### 3. Password Reset Flow
- Generates secure reset tokens
- Creates time-limited reset links
- Sends formatted password reset emails
- Manages token lifecycle (creation, validation, removal)

### 4. Security Features
- Uses crypto for secure token generation
- Implements token expiration (1 hour)
- Stores tokens in memory (Map)
- Validates email addresses and content

This controller provides a robust foundation for email-based features while maintaining security and reliability.

## Chart Controller Logic

The `chartController.js` implements comprehensive data visualization functionality with several key components:

### 1. Data Processing Functions
- `processLineData`: Creates time-series data for line charts
  - Groups transactions by date
  - Separates income and expenses
  - Sorts dates chronologically
  - Formats data with consistent styling

- `processBarData`: Generates comparative data for bar charts
  - Similar grouping logic to line charts
  - Uses distinct colors for income/expenses
  - Maintains chronological ordering
  - Optimized for bar visualization

- `processDoughnutData`: Creates summary data for doughnut charts
  - Calculates total income and expenses
  - Uses contrasting colors for visualization
  - Provides clear percentage distribution
  - Includes border styling for better visibility

### 2. Summary Statistics
- `calculateSummary`: Computes key financial metrics
  - Total income calculation
  - Total expenses calculation
  - Net balance computation
  - Provides comprehensive financial overview

### 3. Main Controller Function
- `getChartData`: Orchestrates the data processing
  - Fetches user transactions
  - Handles empty data scenarios
  - Processes data for all chart types
  - Returns formatted response with:
    - Line chart data
    - Bar chart data
    - Doughnut chart data
    - Summary statistics

### 4. Data Formatting
- Consistent number formatting
- Date standardization
- Color scheme consistency
- Proper data structure for Chart.js

This controller provides a robust foundation for financial data visualization while maintaining data integrity and user experience.

## Transaction Controller Logic

The `transactionController.js` implements CRUD operations for financial transactions with robust error handling and data validation:

### 1. Get Transactions
- `getTransactions`: Retrieves all transactions for a user
  - Filters by userId for data isolation
  - Formats amounts to 2 decimal places
  - Returns array of formatted transactions
  - Includes error handling for database queries

### 2. Add Transaction
- `addTransaction`: Creates new transaction records
  - Validates required fields (description, amount, type, category, date)
  - Formats amount to 2 decimal places
  - Associates transaction with user via userId
  - Returns saved transaction with success status
  - Implements error handling for database operations

### 3. Update Transaction
- `updateTransaction`: Modifies existing transactions
  - Validates transaction ownership via userId
  - Updates all transaction fields
  - Formats amount consistently
  - Returns updated transaction data
  - Includes ownership verification
  - Handles not found scenarios

### 4. Delete Transaction
- `deleteTransaction`: Removes transaction records
  - Verifies transaction ownership
  - Implements soft delete functionality
  - Returns success status
  - Includes error handling
  - Validates user permissions

### 5. Data Validation & Security
- User authentication via userId
- Amount formatting consistency
- Input validation
- Error handling for all operations
- Data isolation between users

This controller provides a secure and reliable foundation for transaction management while maintaining data integrity and user privacy.

## User Controller Logic

The `userController.js` implements user authentication and registration with robust security measures:

### 1. User Registration
- `userRegister`: Handles new user creation
  - Validates email format using validator
  - Enforces password strength (minimum 8 characters)
  - Checks for existing users to prevent duplicates
  - Securely hashes passwords using bcrypt
  - Generates JWT token for immediate authentication
  - Returns success status and token
  - Implements comprehensive error handling

### 2. User Login
- `loginUser`: Authenticates existing users
  - Validates user credentials
  - Compares hashed passwords securely
  - Generates new JWT token on successful login
  - Returns user data and authentication token
  - Implements error handling for invalid credentials

### 3. Token Verification
- `verifyToken`: Validates user authentication
  - Verifies JWT token validity
  - Returns user information if authenticated
  - Handles token expiration and invalid tokens
  - Maintains session security

### 4. Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Email format validation
- Password strength requirements
- Duplicate user prevention
- Secure token generation
- Comprehensive error handling

This controller provides a secure foundation for user authentication while maintaining data privacy and implementing industry-standard security practices.

## Middleware Logic

### 1. Authentication Middleware
- `validateToken`: Core authentication middleware
  - Extracts JWT token from request headers
  - Verifies token validity using JWT_SECRET
  - Decodes user information from token
  - Attaches user data to request object
  - Handles token expiration and invalid tokens
  - Maintains secure session management

### 2. Error Handling Middleware
- `errorHandler`: Global error handling
  - Catches and processes all application errors
  - Formats error responses consistently
  - Logs errors for debugging
  - Provides user-friendly error messages
  - Maintains error tracking and monitoring
  - Implements graceful error recovery

### 3. CORS Middleware
- `cors`: Cross-Origin Resource Sharing
  - Manages cross-origin requests
  - Configures allowed origins
  - Handles preflight requests
  - Implements security headers
  - Controls resource access
  - Maintains API security

### 4. Request Parsing Middleware
- `express.json()`: Request body parsing
  - Parses JSON request bodies
  - Validates request format
  - Handles malformed requests
  - Maintains data integrity
  - Implements request validation
  - Ensures proper data processing

### 5. Security Features
- Request validation
- Error handling
- CORS protection
- Body parsing
- Authentication checks
- Session management
- Security headers

This middleware stack provides a robust foundation for request processing, security, and error handling while maintaining application stability and security.

