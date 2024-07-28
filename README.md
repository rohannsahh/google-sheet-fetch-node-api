# google-sheet-fetch-node-api

Objectives
Fetch weather forecast data for New Delhi and Mumbai.
Automate the process to update this data into a Google Sheets document.
Schedule the task to run daily and send email notifications upon completion.
Technologies Used
Node.js: To create the script for fetching weather data and updating Google Sheets.
WeatherAPI: For obtaining weather forecast data.
Google Sheets API: To programmatically update the Google Sheets document.
Google Cloud Service Account: For authentication and authorization.
Node Cron: To schedule the task.
Nodemailer: To send email notifications.
Implementation Steps
Set Up the Environment

Installed necessary Node.js packages: axios, googleapis, node-cron, dotenv, and nodemailer.
Created a .env file to securely store API keys and other sensitive information.
Fetch Weather Data

Used axios to send HTTP requests to WeatherAPI and fetch 7-day weather forecasts for New Delhi and Mumbai.
Parsed the JSON response to extract relevant weather information.
Google Sheets Integration

Created a service account in Google Cloud Platform and generated a JSON key file for authentication.
Shared the Google Sheets document with the service account email to grant edit access.
Used Google Sheets API to authenticate and update the specified Google Sheets document with the fetched weather data.
Automate the Task

Used node-cron to schedule the script to run daily at 8 AM.
Implemented error handling to ensure smooth execution and retry on failures.
Sent email notifications using nodemailer to inform about the task status.
Testing and Validation

Manually ran the script to ensure it fetched the weather data correctly and updated the Google Sheets document.
Verified the scheduled task execution and email notifications.
