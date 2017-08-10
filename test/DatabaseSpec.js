var db = require( '../database-mongo' );
var app = require('../server/index.js');

db.clear(() => {

  var user1 = {username:'mardymar',password:'password',fullname:'Marc Perry',
    email:'mpkorea',location:'SF'};

  var user2 = {username:'Marc',password:'1234',fullname:'Jack Baker',
    email:'pluto',location:'LA'};

  var cookies = ['adoije', 'hoewohv'];

  db.postCookie(cookies[0], function(){
    db.postCookie(cookies[1], function() {
      db.postUser(user1, cookies[0], function(success) {
        db.postUser(user2, cookies[1], function() {


          var testGetProfile = function(){
            db.getProfile(user1.username, (results)=>{
              console.log('\n\n\nGet profile cookie should = "adoije"...................\n');
              console.log(results.cookies);
            });
          }

          var testGetHash = () => {
            db.getHash(user1.username, (pass) =>{
              console.log('\n\nGet hash should = "password".......................\n');
              console.log(pass);
            })
          }

          var testPostMessageAndGetMessage = () => {
            db.postMessage(user1.username, user2.username, 'This is a test', () => {
              db.getMessages(user1.username, (results) => {
                console.log('\n\nPost message then Get message should = "This is a test".........................\n')
                console.log(results.sent[0].message);
              })
            });
          }

          var testPostTestResults = () => {
            db.postTestResults(user1.username, 'infp', () => {
              db.getProfile(user1.username, (results) => {
                console.log('\n\nPost test results should = "infp"..........................\n');
                console.log(results.testResults);
              })
            });
          }

          var testPostAndGetMatches = () => {
            db.postTestResults(user1.username, 'infp', () => {
              //console.log('1 -------')
              db.postTestResults(user2.username, 'infj', () => {
                //console.log('2 -------------')
                db.getMatches(user1.username, (results) => {
                  console.log('\n\nPost and Get matches should = "[ { compatability: 30, match: Marc } ]"......................\n')
                  console.log(results);
                })
              })
            });
          }

          testGetProfile();
          testGetHash();
          testPostMessageAndGetMessage();
          testPostTestResults();
          testPostAndGetMatches();
        })
      })
    })
  })
});























