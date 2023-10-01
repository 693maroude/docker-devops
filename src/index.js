require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config");

const protect = require("./middleware/auth.handler");
const errorHandler = require("./middleware/error.handler");

const testRouter = require("./routes/test.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectToMongo = () =>
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Succesfully connected to DB."))
    .catch((error) => {
      console.error(error);
      setTimeout(connectToMongo, 5000);
    });
connectToMongo();

const redisURL = `redis://${REDIS_URL}:${REDIS_PORT}`;
const redisClient = redis.createClient({ url: redisURL });
const connectToRedis = () =>
  redisClient
    .connect()
    .then(() => console.log("Succesfully connected to Redis."))
    .catch((error) => {
      console.error(error);
      setTimeout(connectToMongo, 5000);
    });
connectToRedis();

const app = express();
app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);
app.use(express.json());
app.use("/api/test", testRouter);
app.use("/api/v1/posts", protect, postRouter);
app.use("/api/v1/users", userRouter);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
