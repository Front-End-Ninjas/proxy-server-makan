const redisClient = require('./redisClient');

const checkCache = (req, res, next) => {
  redisClient.get('bundle', (err, data) => {
    if (err) {
      console.log('Failed to get from Redis', err);
      next();
    } else if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = checkCache;
