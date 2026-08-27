const { Client } = require('ssh2');

const conn = new Client();
const config = {
  host: '192.168.104.50',
  port: 22,
  username: 'user',
  password: 'Worker@123',
  readyTimeout: 10000,
};

conn.on('ready', () => {
  console.log('Client :: ready');
  
  const setupCommands = [
    'cd xat-burgilash-app',
    'git pull',
    'npm run build',
    'pm2 restart xat-app'
  ].join(' && ');

  console.log('Executing update commands...');
  
  conn.exec(setupCommands, { pty: true }, (err, stream) => {
    if (err) throw err;
    
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).on('error', (err) => {
  console.error('Connection error: ', err);
}).connect(config);
