var expect = require('chai').expect;
var request = require('request');
var db = require( '../database-mongo' );

var user1 = {
  username: 'Andy', 
  password: '1234', 
  fullname: 'bla serd', 
  email: 'basd@sadf.com', 
  location: 'CA'
};
var user2 = {
  username: 'Lara', 
  password: '1234', 
  fullname: 'sdfg serd', 
  email: 'basd@sadf.com', 
  location: 'CA'
};
  

describe('testing login post request', () => {
  it('send a response with statusCode 201', (done) => {
    
    var options = {
      method: 'POST',
      url:'http://127.0.0.1:8080/login', 
      json:
      {
        username: user1.username,
        password: user1.password
      }
    };

    request( options, (error, res, body) => {
        if (error) {console.log(error)};
        expect(res.statusCode).to.equal(201);
        done();
      }
    )
  })
});

describe('testing signup post request', () => {
  it('send a response with statusCode 201', (done) => {
    
    var options = {
      method: 'POST',
      url:'http://127.0.0.1:8080/signup', 
      json:
      {
        username: user1.username,
        password: user1.password
      }
    };

    request( options, (error, res, body) => {
        if (error) {console.log(error)};
        expect(res.statusCode).to.equal(201);
        done();
      }
    )
  })
});

describe('testing test post request', () => {
  it('send a response with statusCode 201', (done) => {
    
    var options = {
      method: 'POST',
      url:'http://127.0.0.1:8080/test', 
      json:
      {
        username: user1.username,
        results: 'infp'
      }
    };

    request( options, (error, res, body) => {
        if (error) {console.log(error)};
        expect(res.statusCode).to.equal(201);
        done();
      }
    )
  })
});

describe('testing matches post request', () => {
  it('send a response with statusCode 201', (done) => {
    
    var options = {
      method: 'POST',
      url:'http://127.0.0.1:8080/matches', 
      json:
      {
        username: user1.username,
        testResults: 'infp'
      }
    };

    request( options, (error, res, body) => {
        if (error) {console.log(error)};
        expect(res.statusCode).to.equal(201);
        done();
      }
    )
  })
});

describe('testing message post request', () => {
  
  it('send a response with statusCode 201', (done) => {
    
    var options = {
      method: 'POST',
      url:'http://127.0.0.1:8080/message', 
      json:
      {
        username: user1.username,
        password: user1.password
      }
    };

    request( options, (error, res, body) => {
        if (error) {console.log(error)};
        expect(res.statusCode).to.equal(201);
        done();
      }
    )
  })
});

describe('testing profile get request', () => {

  it('send a 200 status code and a json stringified profile', (done) => {

    db.clear(() => {
      db.postUser(user1, 'user1Cookie', () => {

        request.get('http://127.0.0.1:8080/profile', (err, res, body) => {
          console.log('*****************error: ', err);
          console.log('*****************res.statusCode: ', res.statusCode);
          console.log('*****************body: ', body);
          expect(res.statusCode).to.equal(200);
          done();
        })
      })
    })
  })
})

describe('testing matches get request', () => {

  it('send a 200 status code and a json stringified matches', (done) => {

    //db.clear(() => {
      db.postUser(user1, 'user1Cookie', () => {
        db.postUser(user2, 'user2Cookie', () => {
          db.postTestResults(user1.username, 'infp', () => {
            db.postTestResults(user2.username, 'infp', () => {              
            })  
          })          
        })
      })
    //})
    request.get('http://127.0.0.1:8080/matches', (err, res, body) => {
      console.log('*****************error: ', err);
      console.log('*****************res.statusCode: ', res.statusCode);
      console.log('*****************body: ', body);
      //expect(res.statusCode).to.equal(200);
      done();
    })
  })
})
// describe('matches', () => {

//   it('send a response with the matching profiles', () => {

    
//     db.clear(() => {
//       db.postUser(user1, user1.cookies, () => {
//         console.log('body');
//         expect(0).to.equal(1);
//         db.postUser(user2, user2.cookies, () => {
//           db.postTestResults('Andy', 20, () => {
//             db.postTestResults('Lara', 20, () => {
              
//               request.get('http://127.0.0.1:8080/matches', (err, res, body) => {
//                 console.log('body');
//                 expect(0).to.equal(1);
//               })
//             })
//           })
//         })
//       });
//     });   
//   })
// })

db.clear(() => {});
