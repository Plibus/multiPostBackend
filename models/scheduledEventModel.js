const db = require('../databases/db');

module.exports = class ScheduledEventModel {
  constructor(id, user_id, date, event, post, 
              facebook, facbook_id, facebook_posted, facebook_token, facbook_secrettoken,
              instagram, instagram_id, instagram_posted, instagram_token, instagram_secrettoken,
              pintrest, pintrest_id, pintrest_posted, pintrest_token, pintrest_secrettoken,
              reddit, reddit_id, reddit_posted, reddit_token, reddit_secrettoken,
              twitter, twitter_id, twitter_posted, twitter_token, twitter_secrettoken,
              youtube, youtube_id, youtube_posted, youtube_token, youtube_secrettoken) {
    this.id = id;
    this.user_id = user_id;
    this.date = date;
    this.event = event;
    this.post = post;
    this.facebook = facebook;
    this.facebook_id = facbook_id;
    this.facebook_posted = facebook_posted;
    this.facebook_token = facebook_token;
    this.facebook_secrettoken = facbook_secrettoken;
    this.instagram = instagram;
    this.instagram_id = instagram_id;
    this.instagram_posted = instagram_posted;
    this.instagram_token = instagram_token;
    this.instagram_secrettoken = instagram_secrettoken;
    this.pintrest = pintrest;
    this.pintrest_id = pintrest_id;
    this.pintrest_posted = pintrest_posted;
    this.pintrest_token = pintrest_token;
    this.pintrest_secrettoken = pintrest_secrettoken;
    this.reddit = reddit;
    this.reddit_id = reddit_id; 
    this.reddit_posted = reddit_posted;
    this.reddit_token = reddit_token;
    this.reddit_secrettoken = reddit_secrettoken; 
    this.twitter = twitter;
    this.twitter_id = twitter_id;
    this.twitter_posted =twitter_posted;
    this.twitter_token = twitter_token;
    this.twitter_secrettoken = twitter_secrettoken;
    this.youtube = youtube;
    this.youtube_id = youtube_id;
    this.youtube_posted = youtube_posted;
    this.youtube_token = youtube_token;
    this.youtube_secrettoken = youtube_secrettoken;
  }
  
  static fetchAll() {
    return db.execute('SELECT * FROM scheduledPostEvents');
  }
  
  static fetchUserEvents(user_id) {
    return db.execute('SELECT * FROM scheduledPostEvents WHERE user_id = ?', [user_id]);
  }
  
  static fetchPastEvents() {
    return db.execute('SELECT * FROM scheduledPostEvents WHERE date <= NOW()');
  }
  
  static fetchFacebook() {
    return db.execute('SELECT id, user_id, date, event, post, facbook_id, facebook_token, facbook_secrettoken FROM scheduledPostEvents WHERE facebook = true AND facebook_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedFacebook(id) {
    return db.execute('UPDATE scheduledPostEvents SET facebook_posted = true WHERE id = ?', [id]);
  }
  
  static fetchInstagram() {
    return db.execute('SELECT id, user_id, date, event, post, instagram_id, instagram_token, instagram_secrettoken FROM scheduledPostEvents WHERE instagram = true AND instagram_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedInstagram(id) {
    return db.execute('UPDATE scheduledPostEvents SET instagram_posted = true WHERE id = ?', [id]);
  }
  
  static fetchPintrest() {
    return db.execute('SELECT id, user_id, date, event, post, pintrest_id, pintrest_token, pintrest_secrettoken FROM scheduledPostEvents WHERE pintrest = true AND pintrest_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedPintrest(id) {
    return db.execute('UPDATE scheduledPostEvents SET pintrest_posted = true WHERE id = ?', [id]);
  }
  
  static fetchReddit() {
    return db.execute('SELECT id, user_id, date, event, post, reddit_id, reddit_token, reddit_secrettoken FROM scheduledPostEvents WHERE reddit = true AND reddit_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedReddit(id) {
    return db.execute('UPDATE scheduledPostEvents SET reddit_posted = true WHERE id = ?', [id]);
  }
  
  static fetchTwitter() {
    return db.execute('SELECT id, user_id, date, event, post, twitter_id, twitter_token, twitter_secrettoken FROM scheduledPostEvents WHERE twitter = true AND twitter_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedTwitter(id) {
    return db.execute('UPDATE scheduledPostEvents SET twitter_posted = true WHERE id = ?', [id]);
  }
  
  static fetchYoutube() {
    return db.execute('SELECT id, user_id, date, event, post, youtube_id, youtube_token, youtube_secrettoken FROM scheduledPostEvents WHERE youtube = true AND youtube_posted = false AND date <= NOW()');
  }
  
  static UpdatePostedYoutube(id) {
    return db.execute('UPDATE scheduledPostEvents SET youtube_posted = true WHERE id = ?', [id]);
  }
  
  static insert(user_id, date, event, post, 
              facebook, facbook_id, facebook_posted, facebook_token, facbook_secrettoken,
              instagram, instagram_id, instagram_posted, instagram_token, instagram_secrettoken,
              pintrest, pintrest_id, pintrest_posted, pintrest_token, pintrest_secrettoken,
              reddit, reddit_id, reddit_posted, reddit_token, reddit_secrettoken,
              twitter, twitter_id, twitter_posted, twitter_token, twitter_secrettoken,
              youtube, youtube_id, youtube_posted, youtube_token, youtube_secrettoken) {
    return db.execute('INSERT INTO scheduledPostEvents' +
                        '(user_id, date, event, post, facebook, facbook_id, facebook_posted, facebook_token, facbook_secrettoken, instagram, instagram_id, instagram_posted, instagram_token, instagram_secrettoken, pintrest, pintrest_id, pintrest_posted, pintrest_token, pintrest_secrettoken, reddit, reddit_id, reddit_posted, reddit_token, reddit_secrettoken, twitter, twitter_id, twitter_posted, twitter_token, twitter_secrettoken, youtube, youtube_id, youtube_posted, youtube_token, youtube_secrettoken)' +
                        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [user_id, date, event, post, 
                        facebook, facbook_id, facebook_posted, facebook_token, facbook_secrettoken,
                        instagram, instagram_id, instagram_posted, instagram_token, instagram_secrettoken,
                        pintrest, pintrest_id, pintrest_posted, pintrest_token, pintrest_secrettoken,
                        reddit, reddit_id, reddit_posted, reddit_token, reddit_secrettoken,
                        twitter, twitter_id, twitter_posted, twitter_token, twitter_secrettoken,
                        youtube, youtube_id, youtube_posted, youtube_token, youtube_secrettoken]
                     );
  }
};