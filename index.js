const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY  || '6a419933e17f471b8e694343242807';
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const CITIES = ['New Delhi', 'Mumbai'];
const SERVICE_ACCOUNT_KEY_FILE ='./service-account-key.json';

async function fetchWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7`;
  const response = await axios.get(url);
  return response.data;
}

async function updateGoogleSheet(auth, data) {
  const sheets = google.sheets({ version: 'v4', auth });
  const requests = data.map((cityData, index) => ({
    range: `Sheet1!A${index * 8 + 1}`,
    values: cityData,
  }));

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: GOOGLE_SHEETS_ID,
    resource: {
      valueInputOption: 'RAW',
      data: requests,
    },
  });
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const data = await Promise.all(
    CITIES.map(async (city) => {
      const weatherData = await fetchWeatherData(city);
      const forecast = weatherData.forecast.forecastday.map((day) => [
        day.date,
        day.day.maxtemp_c,
        day.day.mintemp_c,
        day.day.condition.text,
      ]);
      return [[city], ...forecast];
    })
  );

  await updateGoogleSheet(auth, data);
}

main().catch(console.error);
