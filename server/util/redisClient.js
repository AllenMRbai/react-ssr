const redis = require("redis");
const { redisConfig } = require("../config/db");

const redisClient = redis.createClient(redisConfig.port, redisConfig.host);

redisClient.on("error", err => console.log(err));

module.exports = redisClient;
