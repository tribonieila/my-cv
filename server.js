var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var nodemailer = require('nodemailer')
var mg = require('nodemailer-mailgun-transport')
var app = express();

var i18n = require('./i18n/western-europe.json')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


// view engine setup
var hbs = exphbs.create({
  defaultLayout: 'layout',
  partialsDir: 'views/partials'
})

app.engine('handlebars', hbs.engine )
app.set('view engine', 'handlebars')
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res) {
  res.render('index', {title: 'HILARIO B. VILLAR'})
})

app.get('/coverletter', function(req, res) {
  res.render('coverletter', { title: 'HILARIO B. VILLAR | Cover Letter'})
})

app.get('/expertise', function(req, res) {
  res.render('expertise', { title: 'HILARIO B. VILLAR | Expertise'})
})

app.get('/projects', function(req, res) {
  res.render('projects', { title: 'HILARIO B. VILLAR | Projects'})
})

app.get('/contact', function(req, res) {
  res.render('contact', { title: 'HILARIO B. VILLAR | Contact'})
})

app.post('/contact', function(req, res) {
  var data = req.body;
  var htmlContent = '<p>Name: ' + req.body.sender_name +  '</p>' +
                    '<p>Email: ' + req.body.sender_email +  '</p>' +
                    '<p>Message: ' + req.body.sender_message +  '</p>';
                    // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
  var auth = {
    auth: {
      api_key: 'key-47e9c86b252fc3f94eab7ebdedca5ab1',
      domain: 'sandbox59c58f6b8a08430b8dba19f64766bf17.mailgun.org'
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: 'myemail@example.com',
    to: 'tribo.ni.eila@gmail.com', // An array if you have multiple recipients.
    cc:'second@domain.com',
    bcc:'secretagent@company.gov',
    subject: 'Hey you, awesome!',
    'h:Reply-To': 'reply2this@company.com',
    //You can use "html:" to send HTML email content. It's magic!
    html: '<b>Wow Big powerful letters</b>',
    //You can use "text:" to send plain-text content. It's oldschool!
    text: 'Mailgun rocks, pow pow!'
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });
// create reusable transporter object using the default SMTP transport
  /*
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
          type: 'OAuth2',
          user: 'tribo.ni.eila@gmail.com',
          clientId: '470076890250-i3vrld81uu05ptkq0dt1bn4fas6ih5np.apps.googleusercontent.com',
          clientSecret: 'DRIfM0815gxo6FH5GgOsNs4c',
          accessToken: 'ya29.GluNBBnhXtIYOlzw5D4RIH4v4Vkq3n4P6_UZur-YoWw34MNCXucZknIsCDK0R6ToVBk0Z13-8cfwZlAMsvKL45VZ9iAxJKVfw3Th1YXacBlf71rCCsESm-URmRVs',
          expires: 3600,
          refreshToken: '1/0vloH7GYAmbG300iTsiAfbTlVkVz9GsTMaAxo_q3p4k'
      }
  })
  */
/*
"access_token": "ya29.GluNBBnhXtIYOlzw5D4RIH4v4Vkq3n4P6_UZur-YoWw34MNCXucZknIsCDK0R6ToVBk0Z13-8cfwZlAMsvKL45VZ9iAxJKVfw3Th1YXacBlf71rCCsESm-URmRVs",
"token_type": "Bearer",
"expires_in": 3600,
"refresh_token": "1/0vloH7GYAmbG300iTsiAfbTlVkVz9GsTMaAxo_q3p4k"

 */
/*
  var mailOptions = {
    from: "tribo.ni.eila@gmail.com",
    to: "tribo.ni.eila@gmail.com",
    subject: "Hello",
    generateTextFromHTML: true,
    html: htmlContent
  }
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      transporter.close();
  })
  */
  /*
  transporter.set('oauth2_provision_cb', (user, renew, callback) => {
      let accessToken = 'tribo.ni.eila@gmail.com';
      if(!accessToken){
          return callback(new Error('Unknown user'));
      }else{
          return callback(null, accessToken);
      }
  })

  transporter.sendMail({
      from: 'tribo.ni.eila@gmail.com',
      to: 'tribo.ni.eila@gmail.com',
      subject: 'Message',
      text: 'I hope this message gets through!',
      auth: {
          user: 'tribo.ni.eila@gmail.com',
          refreshToken: '1/51ZPPT-URGu3f0ZFhAUHlR48Rrf_dGf5aE1DPsDv-1M',
          accessToken: 'ya29.GluJBDbOLOh-eGSDBff9NBnleljawffhhv9aY3KfmrZ3QjaOstCvW6zXboNiguQe0_Ubsc2BYO8QHIDmTESgL5OUjiKkjST9_no6seagxFnroh_c69w3vU__t5Hq',
          expires: 3600
      }
  })
  */




  /*
  // setup email data with unicode symbols
  var mailOptions = {
      from: req.body.sender_name + ' &lt;' + req.body.sender_email + '&gt;', // sender address
      to: 'tribo.ni.eila@gmail.com', // list of receivers
      subject: 'Inquiry', // Subject line
      html: htmlContent

  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      transporter.close();
  })
  */
  res.render('thankyou', { title: 'HILARIO B. VILLAR | Contact'})
})


// catch 404 and forwared to error handler
app.use(function(req, res, next) {
  var err = new Error(i18n['English']['404'])
  err.status = 404
  next(err)
})

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ', port ' + server_port);
});

module.exports = app
