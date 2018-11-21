/* middlewares/SchemaValidator.js */

const _ = require('lodash');
const Joi = require('joi');

module.exports = (Schema) => {
  // enabled HTTP methods for request data validation
  const supportedMethods = ['post', 'put', 'patch', 'delete'];

  // Joi validation options
  const validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (_.includes(supportedMethods, method)) {
      if (Schema) {
        // Validate req.body using the schema and validation options
        return Joi.validate(req.body, Schema, validationOptions, (err, data) => {
          if (err) {
            // Send back the JSON error response
            return res.status(422).json({
              status: 'error',
              message: 'Invalid request data. Please review request and try again.',
              errors: {
                // eslint-disable-next-line no-underscore-dangle
                original: err._object,

                // fetch only message and type from each error
                details: _.map(err.details, ({ message, type }) => ({
                  message: message.replace(/['"]/g, ''),
                  type,
                })),
              },
            });
          // eslint-disable-next-line no-else-return
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;
            return next();
          }
        });
      }
    }

    return next();
  };
};
