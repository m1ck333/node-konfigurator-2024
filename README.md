# Node konfigurator

Node-Konfigurator is a backend API server designed for a door configuration system. This application allows users to create custom doors by selecting different options such as colors, types, and measurements. It provides a powerful and flexible API for managing door configurations, user authentication, and administration tasks.

## Prerequisites

- Node.js and npm
- TypeScript
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/m1ck333/node-konfigurator-2024.git
   cd node-konfigurator-2024
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

   Create a `.env` file in the root directory of the project based on `.env.example`. Populate it with your own values.

   **To generate a JWT secret, use the following command:**

   ```bash
   openssl rand -base64 32
   ```

   Copy the output and paste it into your `.env` file for the `JWT_SECRET` variable.

## Database Setup

## Database Setup

1. **Run MongoDB:**

   If your root filesystem is read-only, follow these steps to run MongoDB using a custom data path:

   ### On macOS:

   - Create a data directory in your home directory:

     ```bash
     mkdir -p ~/data/db
     ```

   - Start MongoDB with the custom path:

     ```bash
     mongod --dbpath ~/data/db
     ```

   ### On Windows:

   - Create a `data\db` directory:

     ```cmd
     mkdir C:\data\db
     ```

   - Start MongoDB with the custom path:

     ```cmd
     mongod --dbpath C:\data\db
     ```

   ### Otherwise, if no issues are present, you can simply run:

   ```bash
   mongod
   ```

2. **Seed the Database:**

   To seed the database with initial data, run:

   ```bash
   npx ts-node src/scripts/seedDatabase.ts
   ```

## Development

1. **Run the application in development mode:**

   ```bash
   npm run start:dev
   ```

2. **Run the application in production mode:**

   ```bash
   npm run start
   ```

## Utilities

1. **Sort Locales JSON Alphabetically:**

   To alphabetically sort JSON keys in the locales files, use:

   ```bash
   npx ts-node src/scripts/sortLocaleJsonKeys.ts
   ```

## Project Structure

The project follows a standard Node.js server architecture with TypeScript support:

- **src/**: Contains all the source code for the application.
  - **controllers/**: Handles HTTP requests and responses.
  - **middleware/**: Contains middleware functions for request validation, authentication, error handling, etc.
  - **models/**: Mongoose models that define the data structure for MongoDB collections.
  - **routes/**: Defines the API routes and associates them with the respective controller methods.
  - **services/**: Business logic and database interactions.
  - **utils/**: Utility functions and reusable code like response handlers and data sanitization.
  - **scripts/**: Contains scripts like database seeding and sorting JSON keys for locales.
  - **locales/**: Holds translation files for different languages.

This structure promotes a clean separation of concerns, making the codebase easy to maintain and scale.
