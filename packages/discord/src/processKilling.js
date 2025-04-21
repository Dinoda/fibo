import Client from './Client.js';

const on = (sign) => {
  console.log(`Received "${sign}", starting killing process...`);

  const clients = Client.clients;

  const all = clients.map(c => {
    const tag = c.client.user.tag;
    return c.destroy().then(() => {
      console.log(`Client "${tag}" properly closed.`);
    });
  });

  Promise.all(all).then(() => {
    console.log(`Properly killed all clients. Shutting down discord...`);
    if (sign instanceof Error) {
      console.error(sign.stack);
      process.exit(-1);
    }
    process.exit(0);
  });
};

export default (killOn = 'SIGINT') => {
  process.on(killOn, on);
};
