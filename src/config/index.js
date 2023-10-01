module.exports = {
  MONGO_IP: process.env.MONGO_IP || "node-app-db-container",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "node-app-redis-container",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  SESSION_SECRET: process.env.SESSION_SECRET,
};
