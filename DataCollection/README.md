# ESP32 Arduino Setup

This section outlines the steps to set up the ESP32 microcontroller for the solar tracker project.

## Prerequisites

Before proceeding with the ESP32 setup, ensure you have the following prerequisites:

- Arduino IDE with ESP32 support
- Access to the Solar Tracker project repository

## Installation Steps

1. **Clone the repository:**

   First, clone the Solar Tracker project repository from GitHub. Open a terminal window and execute the following commands:

   ```bash
   git clone https://github.com/Vedant-8/Solar-tracker-and-maintenance.git
   cd Solar-tracker-and-maintenance/esp32
   ```

2. **Open the Arduino sketch:**

   Open the `DataCollection.ino` file located in the `DataCollection` directory using the Arduino IDE.

3. **Install required libraries:**

   Ensure that the following libraries are installed in your Arduino IDE:

   - WiFi
   - WiFiClientSecure
   - HTTPClient
   - ESP32Servo

4. **Update WiFi credentials and server IP:**

   In the `DataCollection.ino` file, update the WiFi credentials and server IP address according to your network configuration. Locate the following lines in the code:

   ```cpp
   #define WIFI_NETWORK "Your_SSID"
   #define WIFI_PASSWORD "Your_PASSWORD"
   #define serverName "http://your_server_ip:port/sensor-data"
   ```

   Replace `"Your_SSID"`, `"Your_PASSWORD"`, and `"http://your_server_ip:port/sensor-data"` with your WiFi network SSID, password, and the IP address of your Node.js server respectively.

5. **Upload the code to the ESP32:**

## Usage

After uploading the code to the ESP32, you can power it on and ensure that it connects to your WiFi network. Once connected, the ESP32 will start sending sensor data to the specified server address. You can then access the web interface to view the latest data from the solar tracker project.
