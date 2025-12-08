## Setting Up a Node.js Project with Express.js

### Prerequisites:

- **Node.js and npm (or Yarn):** Make sure you have Node.js installed. It comes bundled with npm (Node Package Manager). You can download it from [nodejs.org](https://nodejs.org/). Verify your installation:
  ```bash
  node -v
  npm -v
  ```

### Step 1: Create Project Directory and Initialize npm

1.  **Create a new directory** for your project.
    ```bash
    mkdir event-match-hub
    cd event-match-hub
    ```
2.  **Initialize npm:** This creates a `package.json` file, which will track your project's dependencies and scripts.
    ```bash
    npm init -y
    ```
    The `-y` flag answers all prompts with default values. You can omit it to answer the questions manually.

### Step 2: Install Express.js

Express.js is the most popular web framework for Node.js.

1.  **Install Express:**
    ```bash
    npm install express
    ```
    This command downloads Express and adds it to your `node_modules` folder and records it in your `package.json` file.

### Step 3: Create your Application File

1.  **Create a new file** for your main application logic (e.g., `app.js` or `server.js`).
    ```bash
    touch app.js
    ```

### Step 4: Write Basic Express Server Code

Open `app.js` in your code editor and add the following code:

```javascript
// Import the express module
const express = require("express");

// Create an instance of the express application
const app = express();

// Define the port number
const port = 3000; // Or process.env.PORT for flexibility

// Define a route for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the Event Match Hub backend.");
});

// Start the server
app.listen(port, () => {
  console.log(`Event Match Hub backend listening at http://localhost:${port}`);
});
```

### Step 5: Run your Node.js Application

1.  **Start the server** from your terminal:
    ```bash
    node app.js
    ```
2.  You should see the message: `Event Match Hub backend listening at http://localhost:3000`.
3.  Open your web browser and go to `http://localhost:3000`. You should see the "Hello World!" message.

### Step 6: Add Nodemon for Development (Highly Recommended)

Nodemon is a utility that automatically restarts your Node.js application when file changes are detected. This speeds up development significantly.

1.  **Install Nodemon globally (or as a dev dependency):**
    - **Globally:** `npm install -g nodemon` (Allows you to run `nodemon` from any directory).
    - **As a dev dependency:** `npm install --save-dev nodemon` (Recommended for project-specific installations).
2.  **Add a Dev Script to `package.json`:**
    Open your `package.json` file and find the `"scripts"` section. Add a line for `dev`:
    ```json
    "scripts": {
      "start": "node app.js", // For production
      "dev": "nodemon app.js"   // For development
    },
    ```
3.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    Now, whenever you save changes to `app.js` or any other file your app uses, Nodemon will automatically restart the server.

**Undo Migrate All**

```bash
npx sequelize-cli db:migrate:undo:all
```

**Migrate All**

```bash
npx sequelize-cli db:migrate
```

**Reseed**

```bash
npx sequelize-cli db:seed:all
```

## Docker

**Docker Build**

```bash
docker-compose up -d --build
```

**Docker Build Only Express JS**

```bash
docker build -t emh_express ./express-app
```

**Docker down**

```bash
docker-compose down -v
```

**Migrate without Reseed**

```bash
docker-compose run --rm express_api npm run db:reset:skip-seed
```

**Migrate with Reseed**

```bash
docker-compose run --rm express_api npm run db:reset
```
