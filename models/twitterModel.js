const db = require('../databases/db');

module.exports = class TwitterModel {
    constructor(id, user_id, user_name, token, tokenSecret) {
        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.token = token;
        this.tokenSecret = tokenSecret;
    }
    static fetch(id) {
        return db.execute('SELECT * FROM twitterAuth WHERE user_id = ?', [id]);
    }

    static insert(id, username, token, tokenSecret) {
        return db.execute('REPLACE INTO twitterAuth ( user_id, user_name, token, tokenSecret) VALUES (?, ?, ?, ?)', [id, username, token, tokenSecret]);
    }
};