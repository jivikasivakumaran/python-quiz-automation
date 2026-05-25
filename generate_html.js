const fs = require('fs');
const { google } = require('googleapis');

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function generateHTML() {

  const auth = new google.auth.GoogleAuth({
    keyFile: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
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

  // FIND UNUSED QUIZ
  const quiz = rows.find(row => row[6] === 'no');

  if (!quiz) {
    console.log('No unused quizzes found.');
    return;
  }

  const rowIndex = rows.indexOf(quiz);

  // COLUMN MAPPING
  const templateType = quiz[0];
  const question = quiz[1];
  const optionA = quiz[2];
  const optionB = quiz[3];
  const optionC = quiz[4];
  const optionD = quiz[5];

  let templateFile = '';

  // TEMPLATE SELECTION
  if (templateType === 'output') {
    templateFile = 'templates/output_template.html';
  }

  else if (templateType === 'theory') {
    templateFile = 'templates/theory_template.html';
  }

  else if (templateType === 'debug') {
    templateFile = 'templates/debug_template.html';
  }

  else {
    console.log('Invalid template type.');
    return;
  }

  // READ TEMPLATE
  let html = fs.readFileSync(templateFile, 'utf8');
  const pythonURL=`https://raw.githubusercontent.com/jivikasivakumaran/python-quiz-automation/main/assets/logo.png`;
  const instagramURL=`https://raw.githubusercontent.com/jivikasivakumaran/python-quiz-automation/main/assets/instagram.png`;

  html = html.replace('{{PYTHON_LOGO}}', pythonURL);
  html = html.replace('{{INSTAGRAM_LOGO}}', instagramURL);

  // COMMON
  html = html.replace('{{DAY}}', `DAY: ${rowIndex}/100`);

  // OUTPUT TEMPLATE
  if (templateType === 'output') {

    const imagePath =
      `https://raw.githubusercontent.com/jivikasivakumaran/python-quiz-automation/main/assets/questions/${question}`;

    html = html.replace('{{QUESTION_IMAGE}}', imagePath);

    html = html.replace('{{OPTION_A}}', escapeHTML(optionA));
    html = html.replace('{{OPTION_B}}', escapeHTML(optionB));
    html = html.replace('{{OPTION_C}}', escapeHTML(optionC));
    html = html.replace('{{OPTION_D}}', escapeHTML(optionD));
  }

  // THEORY TEMPLATE
  else if (templateType === 'theory') {

    html = html.replace('{{QUESTION_TEXT}}', escapeHTML(question));

    html = html.replace('{{OPTION_A}}', escapeHTML(optionA));
    html = html.replace('{{OPTION_B}}', escapeHTML(optionB));
    html = html.replace('{{OPTION_C}}', escapeHTML(optionC));
    html = html.replace('{{OPTION_D}}', escapeHTML(optionD));
  }

  // DEBUG TEMPLATE
  else if (templateType === 'debug') {

    const imagePath =
      `https://raw.githubusercontent.com/jivikasivakumaran/python-quiz-automation/main/assets/questions/${question}`;

    html = html.replace('{{QUESTION_IMAGE}}', imagePath);
  }

  // SAVE GENERATED FILE
  fs.writeFileSync('templates/generated.html', html);

  // MARK AS USED
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!G${rowIndex+1}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [['yes']],
    },
  });

  console.log('generated.html created successfully!');
}

generateHTML();