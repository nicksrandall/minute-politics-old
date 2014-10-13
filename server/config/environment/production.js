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
    uri:    process.env.MONGOHQ_URL || 'mongodb://heroku:EhVBuhDfMTLZXh_fUe-VKYmOUaa-XdAkqaSleeVVOFm_m5ARUo3zrNIWgtGw5ig1TBxIR59ThWj5ja6vJ8l26g@kahana.mongohq.com:10040/app30101073',
  }
};
