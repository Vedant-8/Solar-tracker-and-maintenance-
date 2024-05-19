# Node.js Server Setup

This section outlines the steps to set up the Node.js server for the solar tracker project.

## Prerequisites

Before proceeding with the server setup, ensure you have the following prerequisites:

- Node.js and npm installed on your system
- Access to the Solar Tracker project repository
- PostgreSQL database installed and running

## Installation Steps

1. **Clone the repository:**

   First, clone the Solar Tracker project repository from GitHub. Open a terminal window and execute the following commands:

   ```bash
   git clone https://github.com/Vedant-8/Solar-tracker-and-maintenance.git
   cd Solar-tracker-and-maintenance/server
   ```

2. **Install npm packages:**

   In the `server` directory, install the required npm packages by running the following command:

   ```bash
   npm install
   ```

3. **Start the server:**

   Once the npm packages are installed and the `.env` file is configured, you can start the Node.js server by running the following command:

   ```bash
   node index.js
   ```

   This will start the server, and it will be ready to receive sensor data from the ESP32 and store it in the PostgreSQL database.

## Usage

After starting the server, it will listen for incoming sensor data from the ESP32. The server will store this data in the PostgreSQL database and provide a web interface to view the latest sensor readings.
