var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/test' );

var db = mongoose.connection;

db.on( 'error', () => {
  console.log( 'mongoose connection error' );
} );

db.once( 'open', () => {
  console.log( 'mongoose connected successfully' );
} );

userId = ObjectId();

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  testResults: String,
  cookies: String,
  fullname: String,
  email: String,
  matches: [{type: Schema.Types.Mixed}],
  location: String,
  hobbies: String,
  blog: String,
  img: { data: Buffer, contentType: String }
});

var messageSchema= mongoose.Schema({
  sender: String,
  receiver: String,
  message: String
})

var User = mongoose.model( 'User', userSchema );
var Message = mongoose.model('Message', messageSchema);


// userInfo = {username, password, fullname, email, location, cookies},
// callback = false: user already exists - true: user created successfully
var createUser = function(userInfo, callback) {
  User.findOne({ username: userInfo.username }, function(err, doc) {
    if(doc) {
        callback(false);
      } else {
        var user = new User({
          username: userInfo.username,
          password: userInfo.password,
          fullname: userInfo.fullname,
          email: userInfo.email,
          location: userInfo.location,
          cookies: userInfo.cookies

        });
        user.save(function(err, addition) {
          if(err) {
            console.log(err);
          } else {
            callback(true)
          }
        });
      }
}

// user = username, callback = hash, callback = return password or null if pw not present
var getHash = function(user, callback) {
  User.findOnce({username: user}, function(err, doc){
    if(doc) {
      callback(doc.password);
    } else {
      callback(null);
    }
  })
}

// user = username, cookies = cookie
var setCookie = function(user, cookie) {
  User.findOnce({username: user}, function(err, doc){
    if(doc) {
      User.update({username: user},
        {$set: {cookies: cookie}}, {upsert: true})
    } else {
      console.log('User not found');
    }
  }
}

// user = username, results = type
var testResults = function(user, results) {
  User.findOnce({username: user.name}, function(err,doc) {
    if(doc) {
      User.update({username: user},
        {$set: { testResults: results }}, {upsert: true})
    } else {
      console.log('User not found');
    }
  })
}

// user = username, callback = full User row
var getProfileInfo = function(user, callback) {
  User.find({username: user}, function(err, doc) {
    if(doc) {
      callback(doc);
    } else {
      console.log('User not found');
    }
  })
}

// user = username, callback = matches for that user
var getMatches = function(user, callback) {
  User.find({username: user}, function(err, doc) {
    if(doc) {
      callback(doc.matches);
    } else {
      console.log('User not found');
    }
  })
}

// user = username, callback = {sent: messages sent by user, received: messages received by user}
var getMessages = function(user, callback) {
  var results = {sent: [], received: []};
  Message.find({sender: user}, function(err, sent) {
    results.sent = sent.slice();

    Message.find({receiver: user}, function(err, received) {
      results.received = received.slice();

      callback(results);
    })

  })
}









