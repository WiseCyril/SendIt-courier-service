import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/parcel';

// Set up the express app
const app = express();

app.get('/', (req, res) => {
  res.json('Welcome to sendit courier service');
});

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.all('*', (req, res) => {
  res.json('Route not available at the moment');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});
