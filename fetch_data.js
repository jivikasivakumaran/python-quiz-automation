const { google } = require('googleapis');

async function getSheetData() {

  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  });

  const spreadsheetId = '1KeuH8-8uNETIn6KqMWYgH9zVO7p6O1BD_UdtQWXs1R8';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A:G',
  });

  const rows = response.data.values;

  console.log(rows);
}

getSheetData();