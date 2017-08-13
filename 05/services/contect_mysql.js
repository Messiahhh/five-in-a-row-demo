var mysql = require('mysql');
var config = require('./config.js');
var connection = mysql.createConnection(config);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;

//连接数据库