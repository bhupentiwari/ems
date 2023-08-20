const winston = require('winston');
const morgan = require('morgan');

// Create a Winston logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// Morgan middleware for HTTP request logging
const requestLogger = morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = { requestLogger, errorHandler };
