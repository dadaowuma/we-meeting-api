/**
 * @see https://www.npmjs.com/package/log4js
 */
var log4js = require("log4js");

log4js.configure({
  appenders: { 
    console: { 
      type: "console" 
    },
    file: {
      type: "file",
      filename: "logs/app.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true
    }
  },
  categories: { 
    default: { 
      appenders: ['console', 'file'], 
      level: "info" 
    } 
  },
})

var logger = log4js.getLogger('WeMeeting');

logger.level = "debug";

module.exports = logger;