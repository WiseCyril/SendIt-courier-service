const express = require('express');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');

const router = require('./routes/index');

// Set up the express app
const app = express();
// const validatorOptions = {
// };

app.get('/', (req, res) => {
  res.json('Welcome to sendIt courier service');
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator(validatorOptions));
app.use(router);

app.all('*', (req, res) => {
  res.json('Route is not available at the moment');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

// Test for input parameter using express-validator
app.post('/api/v1/parcels',
//  (req, res) => {
  // console.log(req.body);
  // res.sendStatus(200);

  check('userId').isInt().withMessage('This field failed validation.'),
  (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.sendStatus(200);
    } else {
      res.status(400).json(errors.array());
    }
  });
// }

// };
//   check('parcelData.userId')
//     .isLength({ max: 3 })
//     // .withMessage('UserId is a required field')
//     .isInt(),
//   // .withMessage('Enter your three digit number'),

//   check('weight')
//     .isAlphanumeric().withMessage('Weight is a requirement'),

//   (req, res) => {
//     // console.log(req.body);
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(400).json(errors.array());
//     } else {
//       res.sendStatus(200);
//     }
//   });

// app.post('/validateMe', function(req, res) {
//     console.log(req.body);
//     res.sendStatus(200);
// });

module.exports = app;
