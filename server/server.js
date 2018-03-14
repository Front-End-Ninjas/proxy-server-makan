const app = require('./app');
const redisClient = require('./helpers/redisClient');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('LISTENING TO PORT -- 8080'));
