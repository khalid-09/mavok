# MAVOK Project

## Requirements

- **Docker**: Required for running Directus and PostgreSQL using Docker Compose.
- **Node.js**: Ensure Node.js (v20+) is installed.
- **pnpm**: This project uses `pnpm` as the package manager. Install it globally:

  ```bash
  npm install -g pnpm
  ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khalid-09/mavok.git

   ```

2. Navigate to the project directory:

   ```bash
   cd MAVOK

   ```

3. Set Up Directus and PostgreSQL:
   Navigate to the directus/ directory and start the services using Docker Compose:

   ```bash
   cd directus

   docker-compose up -d

   ```

   Directus will be available at http://localhost:8055.
   The database will be automatically initialized using the provided .env variables.

4. Set Up Next.js App: Navigate to the next-app/ directory and install dependencies:

   ```bash
    cd next-app

    pnpm install

   ```

5. Start the development server:

   ```bash
   pnpm dev

   ```

   The Next.js app will be available at http://localhost:3000.
