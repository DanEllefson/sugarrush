'use strict';

const { Redis } = require('@upstash/redis');
require('dotenv').config();

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

console.log('Connected to Upstash Redis');

module.exports = redisClient;
