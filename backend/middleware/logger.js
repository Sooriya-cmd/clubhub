// Express middleware to log each incoming HTTP method and request URL
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  // next() passes control to the next middleware function in the stack
  next();
};

module.exports = logger;
