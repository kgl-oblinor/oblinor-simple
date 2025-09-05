const { spawn } = require('child_process');
const path = require('path');

// Start backend server
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: process.env.FRONTEND_PORT || '5174' }
});

// Handle process termination
process.on('SIGTERM', () => {
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
  process.exit(0);
});

process.on('SIGINT', () => {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit(0);
});

console.log('Starting Oblinor Simple platform...');
console.log('Backend starting on port:', process.env.PORT || 4001);
console.log('Frontend will be served on port:', process.env.FRONTEND_PORT || 5174);