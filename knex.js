const path = require('path');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host     : '*URL GOES HERE*',
        user     : process.env.db_username,
        password : process.env.db_password,
        database : 'Bonefire',
        charset  : 'utf8'
  }}
};
