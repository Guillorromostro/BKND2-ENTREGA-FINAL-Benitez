# Express E-commerce Backend

This is a backend project for an e-commerce application built using Node.js and Express. It implements a complete user system with CRUD operations, authentication, authorization, and JWT handling.

## Features

- User registration and authentication
- Role-based access control
- CRUD operations for users, products, categories, carts, and orders
- JWT for secure authentication
- Middleware for error handling and request validation
- OpenAPI documentation

## Project Structure

```
express-ecommerce-backend
â”œâ”€â”€ src
â”‚   â”œâ”€â”€ app.js
â”‚   â”œâ”€â”€ server.js
â”‚   â”œâ”€â”€ config
â”‚   â”‚   â””â”€â”€ index.js
â”‚   â”œâ”€â”€ database
â”‚   â”‚   â”œâ”€â”€ index.js
â”‚   â”‚   â”œâ”€â”€ migrations
â”‚   â”‚   â””â”€â”€ seeders
â”‚   â”œâ”€â”€ models
â”‚   â”‚   â”œâ”€â”€ index.js
â”‚   â”‚   â”œâ”€â”€ user.model.js
â”‚   â”‚   â”œâ”€â”€ product.model.js
â”‚   â”‚   â”œâ”€â”€ category.model.js
â”‚   â”‚   â”œâ”€â”€ cart.model.js
â”‚   â”‚   â”œâ”€â”€ cartItem.model.js
â”‚   â”‚   â”œâ”€â”€ order.model.js
â”‚   â”‚   â”œâ”€â”€ orderItem.model.js
â”‚   â”‚   â””â”€â”€ refreshToken.model.js
â”‚   â”œâ”€â”€ controllers
â”‚   â”‚   â”œâ”€â”€ auth.controller.js
â”‚   â”‚   â”œâ”€â”€ user.controller.js
â”‚   â”‚   â”œâ”€â”€ product.controller.js
â”‚   â”‚   â”œâ”€â”€ category.controller.js
â”‚   â”‚   â”œâ”€â”€ cart.controller.js
â”‚   â”‚   â””â”€â”€ order.controller.js
â”‚   â”œâ”€â”€ services
â”‚   â”‚   â”œâ”€â”€ auth.service.js
â”‚   â”‚   â”œâ”€â”€ user.service.js
â”‚   â”‚   â”œâ”€â”€ product.service.js
â”‚   â”‚   â”œâ”€â”€ category.service.js
â”‚   â”‚   â”œâ”€â”€ cart.service.js
â”‚   â”‚   â””â”€â”€ order.service.js
â”‚   â”œâ”€â”€ repositories
â”‚   â”‚   â”œâ”€â”€ user.repo.js
â”‚   â”‚   â”œâ”€â”€ product.repo.js
â”‚   â”‚   â”œâ”€â”€ category.repo.js
â”‚   â”‚   â”œâ”€â”€ cart.repo.js
â”‚   â”‚   â””â”€â”€ order.repo.js
â”‚   â”œâ”€â”€ routes
â”‚   â”‚   â”œâ”€â”€ index.js
â”‚   â”‚   â”œâ”€â”€ auth.routes.js
â”‚   â”‚   â”œâ”€â”€ users.routes.js
â”‚   â”‚   â”œâ”€â”€ products.routes.js
â”‚   â”‚   â”œâ”€â”€ categories.routes.js
â”‚   â”‚   â”œâ”€â”€ carts.routes.js
â”‚   â”‚   â””â”€â”€ orders.routes.js
â”‚   â”œâ”€â”€ middlewares
â”‚   â”‚   â”œâ”€â”€ auth.middleware.js
â”‚   â”‚   â”œâ”€â”€ role.middleware.js
â”‚   â”‚   â”œâ”€â”€ error.middleware.js
â”‚   â”‚   â”œâ”€â”€ validate.middleware.js
â”‚   â”‚   â””â”€â”€ rateLimiter.middleware.js
â”‚   â”œâ”€â”€ utils
â”‚   â”‚   â”œâ”€â”€ jwt.js
â”‚   â”‚   â”œâ”€â”€ logger.js
â”‚   â”‚   â”œâ”€â”€ password.js
â”‚   â”‚   â”œâ”€â”€ apiResponse.js
â”‚   â”‚   â”œâ”€â”€ asyncHandler.js
â”‚   â”‚   â””â”€â”€ constants.js
â”‚   â”œâ”€â”€ validations
â”‚   â”‚   â”œâ”€â”€ auth.validation.js
â”‚   â”‚   â”œâ”€â”€ user.validation.js
â”‚   â”‚   â”œâ”€â”€ product.validation.js
â”‚   â”‚   â”œâ”€â”€ category.validation.js
â”‚   â”‚   â”œâ”€â”€ cart.validation.js
â”‚   â”‚   â””â”€â”€ order.validation.js
â”‚   â””â”€â”€ docs
â”‚       â””â”€â”€ openapi.yaml
â”œâ”€â”€ test
â”‚   â”œâ”€â”€ integration
â”‚   â”‚   â”œâ”€â”€ auth.int.test.js
â”‚   â”‚   â”œâ”€â”€ users.int.test.js
â”‚   â”‚   â””â”€â”€ products.int.test.js
â”‚   â””â”€â”€ unit
â”‚       â””â”€â”€ services
â”‚           â””â”€â”€ user.service.test.js
â”œâ”€â”€ .env.example
â”œâ”€â”€ .editorconfig
â”œâ”€â”€ .eslintrc.json
â”œâ”€â”€ .gitignore
â”œâ”€â”€ jest.config.js
â”œâ”€â”€ package.json
â””â”€â”€ README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd express-ecommerce-backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage

To start the server, run:
```
npm start
```

The server will listen on the specified port defined in your environment variables.

## Testing

To run tests, use:
```
npm test
```

## License

This project is licensed under the MIT License.