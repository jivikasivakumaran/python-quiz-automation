const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/', (req, res) => {
  res.send('Python Quiz Automation Running');
});

exec('node main.js', (error, stdout, stderr) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(stdout);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});