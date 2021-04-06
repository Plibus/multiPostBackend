const db = require('../databases/db');

module.exports = class FacebookModel {
  constructor(id, user_id, user_name, token, tokenSecret) {
    this.id = id;
    this.user_id = user_id;
    this.user_name = user_name;
    this.token = token;
    this.tokenSecret = tokenSecret;
  }
  static fetch(name) {
    return db.execute('SELECT * FROM facebookAuth WHERE user_name = ?', [name]);
  }
  
  static insert(username, token, tokenSecret) {
    return db.execute('REPLACE INTO facebookAuth ( user_name, token, tokenSecret) VALUES (?, ?, ?)', [username, token, tokenSecret]);
  }
};