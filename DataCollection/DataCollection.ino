#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include "ESP32Servo.h"

#define photoresistorPin1 34
#define photoresistorPin2 35
#define servoPin 18

#define error 10
int Spoint = 90;

#define WIFI_NETWORK "<Your wifi ssid>"
#define WIFI_PASSWORD "<Your wifi password>"
#define WIFI_TIMEOUT_MS 20000

#define serverName "http://<Your sever IP address>:<Port>/sensor-data"

Servo myservo;

void sendData(String payload)
{
  HTTPClient http;
  http.begin(serverName);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);
  http.end();
}

void connectToWiFi()
{

  Serial.print("WiFi status: ");
  Serial.println(WiFi.status());

  Serial.print("connecting to WiFi");
  WiFi.begin(WIFI_NETWORK, WIFI_PASSWORD);

  unsigned long startAttemptTime = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < WIFI_TIMEOUT_MS)
  {
    Serial.print(".");
    delay(100);
  }

  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(" Failed!");
  }

  else
  {
    Serial.print("Connected!");
    Serial.println(WiFi.localIP());
  }
}

void setup()
{
  Serial.begin(9600);
  myservo.attach(servoPin, 1000, 2000);
  Serial.println(Spoint);
  connectToWiFi();
}

void loop()
{
  int sensorValue1 = analogRead(photoresistorPin1);
  int sensorValue2 = analogRead(photoresistorPin2);

  int value1 = abs(sensorValue1 - sensorValue2);
  int value2 = abs(sensorValue2 - sensorValue1);

  if ((value1 > error) && (value2 > error))
  {
    if (sensorValue1 > sensorValue2)
    {
      Spoint -= 50;
    }
    if (sensorValue1 < sensorValue2)
    {
      Spoint += 50;
    }
  }

  Spoint = constrain(Spoint, 0, 180);

  Serial.println("SensorValue1: ");
  Serial.println(sensorValue1);
  Serial.println("SensorValue2: ");
  Serial.println(sensorValue2);
  Serial.println("Spoint: ");
  Serial.println(Spoint);

  myservo.write(Spoint);

  // Create JSON payload
  String payload = "{\"sensorValue1\": " + String(sensorValue1) + ", \"sensorValue2\": " + String(sensorValue2) + ", \"Spoint\": " + String(Spoint) + "}";

  // Send HTTP POST request
  sendData(payload);

  delay(1000);
}