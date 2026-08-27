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
    'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -',
    'sudo apt-get install -y nodejs git',
    'sudo npm install -g pm2',
    'rm -rf xat-burgilash-app',
    'git clone https://github.com/Bobirumidov/xat-burgilash-app.git',
    'cd xat-burgilash-app && npm install',
    'cd xat-burgilash-app && npm run build',
    'cd xat-burgilash-app && npx prisma db push',
    'cd xat-burgilash-app && pm2 delete xat-app || true',
    'cd xat-burgilash-app && pm2 start npm --name "xat-app" -- start',
    'pm2 save',
    'sudo pm2 startup'
  ].join(' && ');

  console.log('Executing deployment commands...');
  
  // Notice we use a single exec to chain the commands so they run sequentially
  conn.exec(setupCommands, { pty: true }, (err, stream) => {
    if (err) throw err;
    
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
      
      // If sudo asks for password
      if (data.toString().includes('[sudo] password for user:')) {
        stream.write('Worker@123\n');
      }
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).on('error', (err) => {
  console.error('Connection error: ', err);
}).connect(config);
