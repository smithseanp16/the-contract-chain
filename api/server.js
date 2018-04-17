var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path')
var app = express();
var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect('mongodb://milan:milan123456@52.14.177.91:27017/vue_auth', {useMongoClient: true});
// mongoose.connect('mongodb://127.0.0.1:27017/vue-api', {useMongoClient: true});
mongoose.Promise = global.Promise;


function generateKey(password) {
  var cryptographicHash = crypto.createHash('md5');
  cryptographicHash.update(password);
  key = cryptographicHash.digest('hex');

  return key;
}

function generateInitializationVector(password) {
  var cryptographicHash = crypto.createHash('md5');
  cryptographicHash.update(password + key);
  initializationVector = cryptographicHash.digest('hex');

  return initializationVector;
}

function encrypt(input, password) {
  var key = generateKey(password);
  var initializationVector = generateInitializationVector(password);

  var data = new Buffer(input.toString(), 'utf8').toString('binary');

  var cipher = crypto.createCipheriv('aes-256-cbc', key, initializationVector.slice(0, 16));
  var encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  var encoded = new Buffer(encrypted, 'binary').toString('base64');

  return encoded;
};

var Login = require('./app/models/Login');
var config = require('./config');
var bodyParser = require('body-parser');
var empty = require('is-empty');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('superSecret', config.secret);
var sipherKey = 'qazxswedcvfrtgbnhyujmkliop7896547891230';

var port = process.env.PORT || 3000;

var router = express.Router();

app.use(express.static(path.join(__dirname, 'dist')))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/register/')
  .post(function (req, res) {
    var login = new Login();

    Login.findOne({"username": req.body.username}, function (err, user_data) {
      if (err) {
        console.log(err)
      }
      if (user_data) {
        return res.status(409).json({
          status: 409,
          message: "Username already exist.",
        });
      }else{
        Login.findOne({"email": req.body.email}, function (err, user_data) {
          if (err) {
            console.log(err)
          }
          if (user_data) {
            return res.status(409).json({
              status: 409,
              message: "Email already exist.",
            });
          }

          login.username = req.body.username;
          login.password = encrypt(sipherKey, req.body.password);
          login.email = req.body.email;
          login.save(function (err, login_data) {
            if (err)
              return res.status(400).send(err);
            res.json({
              status: 200,
              message: 'You have succesfully registered.'
            });
          });
        });
      }
    });
  });

router.route('/login')
  .post(function (req, res) {
    Login.findOne({
      "username": req.body.username,
      "password": encrypt(sipherKey, req.body.password)
    }, function (err, user_data) {
      if (err || !user_data) {
        return res.status(401).json({
          status: 401,
          message: "Invalid username and password.",
        });
      } else {
        const payload = {
          username: user_data.username
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        res.status(200).json({
          message: "You have succesfully loggedin.",
          token: token
        });
      }
    });
  });


router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({status: 403, success: false, message: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: 403,
      success: false,
      message: 'No token provided.'
    });
  }
});

router.route('/result')
  .get(function (req, res) {
    Login.find(function (err, logins) {
      if (err)
        res.send(err);

      res.json(logins);
    });
  });

app.use('/api', router);
app.get('/*', function (req, res) {
  res.sendFile('/dist/index.html', {root: __dirname});
});
app.listen(port);
