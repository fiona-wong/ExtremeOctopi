var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/test' );

var db = mongoose.connection;

db.on( 'error', () => {
  console.log( 'mongoose connection error' );
} );

db.once( 'open', () => {
  console.log( 'mongoose connected successfully' );
} );

var mbti = {
infp:{infp:30,enfp:30,infj:30,enfj:40,intj:30,entj:40,intp:30,entp:30,isfp:0,esfp:0,istp:0,estp:0,isfj:0,esfj:0,istj:0,estj:0},
enfp:{infp:30,enfp:30,infj:40,enfj:30,intj:40,entj:30,intp:30,entp:30,isfp:0,esfp:0,istp:0,estp:0,isfj:0,esfj:0,istj:0,estj:0},
infj:{infp:30,enfp:40,infj:30,enfj:30,intj:30,entj:30,intp:30,entp:40,isfp:0,esfp:0,istp:0,estp:0,isfj:0,esfj:0,istj:0,estj:0},
enfj:{infp:40,enfp:30,infj:30,enfj:30,intj:30,entj:30,intp:30,entp:30,isfp:40,esfp:0,istp:0,estp:0,isfj:0,esfj:0,istj:0,estj:0},
intj:{infp:30,enfp:40,infj:30,enfj:30,intj:30,entj:30,intp:30,entp:40,isfp:20,esfp:20,istp:20,estp:20,isfj:10,esfj:10,istj:10,estj:10},
entj:{infp:40,enfp:30,infj:30,enfj:30,intj:30,entj:30,intp:40,entp:30,isfp:20,esfp:20,istp:20,estp:20,isfj:20,esfj:20,istj:20,estj:20},
intp:{infp:30,enfp:30,infj:30,enfj:30,intj:30,entj:40,intp:30,entp:30,isfp:20,esfp:20,istp:20,estp:20,isfj:10,esfj:10,istj:10,estj:40},
isfp:{infp:0,enfp:0,infj:0,enfj:40,intj:20,entj:20,intp:20,entp:20,isfp:10,esfp:10,istp:10,estp:10,isfj:20,esfj:40,istj:20,estj:40},
esfp:{infp:0,enfp:0,infj:0,enfj:0,intj:20,entj:20,intp:20,entp:20,isfp:10,esfp:10,istp:10,estp:10,isfj:40,esfj:20,istj:40,estj:20},
istp:{infp:0,enfp:0,infj:0,enfj:40,intj:20,entj:20,intp:20,entp:20,isfp:10,esfp:10,istp:10,estp:10,isfj:20,esfj:40,istj:20,estj:40},
estp:{infp:0,enfp:0,infj:0,enfj:40,intj:20,entj:20,intp:20,entp:20,isfp:10,esfp:10,istp:10,estp:10,isfj:40,esfj:20,istj:40,estj:30},
isfj:{infp:0,enfp:0,infj:0,enfj:40,intj:10,entj:20,intp:10,entp:10,isfp:20,esfp:40,istp:20,estp:40,isfj:30,esfj:30,istj:30,estj:30},
esfj:{infp:0,enfp:0,infj:0,enfj:40,intj:10,entj:20,intp:10,entp:10,isfp:40,esfp:30,istp:40,estp:20,isfj:30,esfj:30,istj:30,estj:30},
istj:{infp:0,enfp:0,infj:0,enfj:40,intj:10,entj:20,intp:10,entp:10,isfp:20,esfp:40,istp:20,estp:40,isfj:30,esfj:30,istj:30,estj:30},
estj:{infp:0,enfp:0,infj:0,enfj:40,intj:10,entj:20,intp:40,entp:10,isfp:20,esfp:40,istp:20,estp:40,isfj:30,esfj:30,istj:30,estj:30}
};



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
  message: String,
  time: Number
});

var testResultsSchema = mongoose.Schema({
  user: String,
  match: String,
  compatability: Number,
  alreadyMatches: Boolean

});

var User = mongoose.model( 'User', userSchema );
var Message = mongoose.model('Message', messageSchema);
var Test = mongoose.model('Test', testResultsSchema);


// userInfo = {username, password, fullname, email, location, cookies},
// callback = false: user already exists - true: user created successfully
var postUser = function(userInfo, callback) {
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
          callback(false);
        } else {
          callback(true)
        }
      });
    }
  })
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
  })
}

//user = username
var removeCookie = function(user) {

}


// user = username, callback = full User row
var getProfile = function(user, callback) {
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

// user = username, results = type
var postTestResults = function(user, results) {
  User.findOnce({username: user.name}, function(err,doc) {
    if(doc) {
      User.update({username: user},
        {$set: { testResults: results }}, {upsert: true})
    } else {
      console.log('User not found');
    }
  })
}

// senderName = sender, receiverName = receiver, messageText = message
var postMessage = function(senderName, receiverName, messageText) {
  var message = new Message({
    sender: senderName,
    receiver: receiverName,
    message: messageText
  });

  message.save();
}

// user1 = username that we want results for, matchInfo = a list that matches all the other users
var postMatches = function(user1, userResults) {
  User.find({}, {username: 1, testResults: 1}).forEach(function(user2) {
    if(user1 !== user2.username) {
      var test1 = new Test({
        user: user1,
        match: user2.username,
        compatability: mbti[userResults][user2.testResults],
        alreadyMatches: false
      });

      test1.save();

      var test2 = new Test({
        user: user2.username,
        match: user1,
        compatability: mbti[user2.testResults][userResults],
        alreadyMatches: false
      });

      test2.save();
    }
  })
}










