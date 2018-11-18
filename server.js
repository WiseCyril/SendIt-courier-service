const http = require('http');
const application = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(application);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});
