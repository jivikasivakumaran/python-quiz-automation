const { execSync } = require('child_process');


try {

  
  console.log('Generating HTML...');

  const output = execSync('node generate_html.js', {
    encoding: 'utf-8'
  });

  console.log(output);
  console.log('Capturing screenshot...');
  const captureOutput = execSync('node capture.js', { encoding: 'utf-8' });
  console.log(captureOutput);

  console.log('Creating reel...');
  const videoOutput = execSync('create_video.bat', { stdio: 'inherit' });
  console.log(videoOutput); 

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