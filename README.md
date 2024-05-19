# Solar Tracker Project Overview

This project is a solar tracker system using an ESP32 microcontroller to adjust a solar panel's angle based on data from two photoresistors. The system logs sensor data and the panel angle to a PostgreSQL database via a Node.js server, with a web interface displaying the latest data.

## Components

- ESP32 microcontroller
- Photoresistors (LDR)
- 1kΩ resistors
- Servo motor (e.g., SG90)
- TP4056 Li-ION battery charger
- LM2956 voltage regulator
- WiFi connection
- Node.js server
- PostgreSQL database

### Prerequisites

- Arduino IDE with ESP32 support
- Node.js and npm
- PostgreSQL database

### ESP32 Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Vedant-8/Solar-tracker-and-maintenance.git
   ```

2. Open `DataCollection.ino` in Arduino IDE.

3. Install required libraries: `WiFi`, `WiFiClientSecure`, `HTTPClient`, `ESP32Servo`.

4. Update WiFi credentials and server IP in the code:

   ```cpp
   #define WIFI_NETWORK "Your_SSID"
   #define WIFI_PASSWORD "Your_PASSWORD"
   #define serverName "http://your_server_ip:port/sensor-data"
   ```

5. Upload the code to the ESP32.

## Usage

1. Power on the ESP32 and ensure WiFi connection.
2. Start the Node.js server.
3. Access the web interface at `http://your_server_ip:port` to view the latest data.
