
const sqlErrors = require('./errorCode');

module.exports = (code, error, res) => {
  res.status(code).json({
    // Numeric type -> error code; other types -> error message/object
    message: typeof error === 'number' ? sqlErrors[error] : 'client error',
    errors: error,
  });
};
