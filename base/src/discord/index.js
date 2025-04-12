import 'dotenv/config';

import REST from './REST.js';
import client from './client.js';

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

try {
  await REST(TOKEN, CLIENT_ID);
} catch(err) {
  console.error(err);
  process.exit(-1);
}

const cl = client();

process.on('SIGINT', (sign) => {
  console.log(sign);
  console.log('Closing client...');
  cl.destroy().then(() => {
    console.log('Client closed. Terminating...');
    process.exit(0);
  });
});

cl.login(TOKEN);

