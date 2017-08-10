var app = require('../server/index.js');
var db = require( '../database-mongo' );

var user1 = {username:'mardymar',password:'password',fullname:'Marc Perry',
  email:'mpkorea',location:'SF'};

var user2 = {username:'Marc',password:'1234',fullname:'Jack Baker',
  email:'pluto',location:'LA'};

var cookies = ['adoije', 'hoewohv'];


db.clear(() => {
  db.postCookie(cookies[0], function(){
    db.postCookie(cookies[1], function() {
      db.postUser(user1, cookies[0], function(success) {
        db.postUser(user2, cookies[1], function() {


          request({
            method: 'POST',
            uri: 'http://127.0.0.1:3000/classes/users',
            json: { username: 'Valjean' }
          })

        });
      });
    });
  });
});