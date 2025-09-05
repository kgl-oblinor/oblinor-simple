const http = require('http');

const data = JSON.stringify({
  email: 'admin@oblinor.no',
  password: 'Admin123!'
});

const options = {
  hostname: 'localhost',
  port: 4001,
  path: '/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  res.on('end', () => {
    console.log('Response:', responseData);
  });
});

req.write(data);
req.end();
