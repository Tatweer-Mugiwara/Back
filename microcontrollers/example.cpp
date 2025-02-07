#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Backend URL
const String backend_url = "https://localhost:3000/api/v1/reports/{id}/report-now";

int thresholdPin = 12;  // Pin that receives the threshold signal from FPGA

void setup() {
  // Start the Serial Monitor
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");

  // Set the threshold pin as input
  pinMode(thresholdPin, INPUT);
}

void loop() {
  int thresholdState = digitalRead(thresholdPin);  // Read the threshold signal from FPGA

  if (thresholdState == HIGH) {
    sendDataToBackend();
  }

  delay(1000);  // Check every second
}

void sendDataToBackend() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Prepare JSON data
    String jsonPayload = "{\"temperature\": 60, \"humidity\": 50}";  // Example data, replace with actual data

    // Send HTTP POST request
    http.begin(backend_url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully.");
    } else {
      Serial.println("Failed to send data.");
    }

    http.end();
  }
}
