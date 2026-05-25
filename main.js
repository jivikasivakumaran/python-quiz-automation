const { execSync } = require('child_process');

try {

  console.log('Generating HTML...');
  execSync('node generate_html.js', { stdio: 'inherit' });

  console.log('Capturing screenshot...');
  execSync('node capture.js', { stdio: 'inherit' });

  console.log('Creating reel...');
  execSync('create_video.bat', { stdio: 'inherit' });

  console.log('Reel created successfully!');

}
catch (error) {

  console.log('Error:', error.message);

  if (error.stdout) {
    console.log('STDOUT:', error.stdout.toString());
  }

  if (error.stderr) {
    console.log('STDERR:', error.stderr.toString());
  }

}