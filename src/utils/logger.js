const winston = require('winston');

const transports = [
  new winston.transports.Console({ silent: process.env.NODE_ENV === 'test' }),
];

if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.File({ filename: 'error.log', level: 'error' }));
  transports.push(new winston.transports.File({ filename: 'combined.log' }));
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports,
});

logger.close = async () => {
  for (const t of logger.transports) {
    try { t.close && t.close(); } catch {}
    try { t._stream && t._stream.end && t._stream.end(); } catch {}
  }
};

module.exports = logger;
