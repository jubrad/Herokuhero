var config = {};

var localDbUri = 'mongodb://localhost:27017/ipbd';
  
config.database = {
  uri: process.env.MONGOLAB_URI || localDbUri
};
  
config.errors = {
  database_error: {
    code: 500,
    type: 'database_error',
    message: 'Sorry, something funky is happening with the database.'
  },
  server_error: {
    code: 500,
    type: 'server_error',
    message: 'Oops. Our server has a stomach ache.'
  },
  invalid_request: {
    code: 400,
    type: 'invalid_request',
    message: 'The request was missing a parameter or otherwise malformed.'
  },
  resource_not_found: {
    code: 400,
    type: 'resource_not_found',
    message: 'The requested resource was not found.'
  }
}
 
module.exports = config;
