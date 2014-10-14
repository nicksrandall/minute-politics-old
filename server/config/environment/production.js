'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGOHQ_URL || '',
  }
};
