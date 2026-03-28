const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.simple(),
  transports: [
  new transports.Console(),
  new transports.File({ filename: "logs/app.log" }),
  new transports.File({ filename: "logs/error.log", level: "error" })
]
});

module.exports = logger;
