'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP || undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT || 9000,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URL || process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGOHQ_URL || '',
  }
};
