//express is the framework we're going to use to handle requests
//push test
const express = require('express')
//Create a new instance of express
const app = express()

let middleware = require('./utilities/middleware')


const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
app.use(bodyParser.json())

app.use('/addcontactmember', middleware.checkToken,require('./routes/addcontactmember.js'))

app.use('/auth', require('./routes/login.js'))

app.use('/auth', require('./routes/register.js'))

app.use('/auth', middleware.checkToken, require('./routes/pushyregister.js'))

app.use('/messages', middleware.checkToken, require('./routes/messages.js'))

app.use('/chatrooms', middleware.checkToken, require('./routes/chatrooms.js'))

app.use('/chats', middleware.checkToken, require('./routes/chats.js'))

app.use('/contact', middleware.checkToken,require('./routes/contact.js'))

app.use('/emailwait', require('./routes/emailwait.js'))

app.use('/password', require('./routes/password.js'))

app.use('/weather', require('./routes/currentweather.js'))

app.use('/fiveday', require('./routes/fiveday.js'))

app.use('/forgotpw', require('./routes/forgotpw.js'))

app.use('/forgotpwemail', require('./routes/forgotpwemail.js'))

app.use('/twelvehour', require('./routes/twelvehour.js'))

app.use('/pusher', middleware.checkToken, require('./routes/pusher.js'))

app.use('/password', require('./routes/password.js'))

app.use('/verified', require('./routes/verified.js'))

app.use('/verifier', require('./routes/verifier.js'))

app.use('/weather/current', require('./routes/weather.js'))

app.use('/zipcode', require('./routes/zipcode.js'))

app.use('/geoposition', require('./routes/geoposition.js'))



/*
 * This middleware function will respond to inproperly formed JSON in 
 * request parameters.
 */
app.use(function(err, req, res, next) {

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      res.status(400).send({ message: "malformed JSON in parameters" });
    } else next();
  })
  
  /*
   * Return HTML for the / end point. 
   * This is a nice location to document your web service API
   * Create a web page in HTML/CSS and have this end point return it. 
   * Look up the node module 'fs' ex: require('fs');
   */
  app.get("/", (request, response) => {
      //this is a Web page so set the content-type to HTML
      response.writeHead(200, {'Content-Type': 'text/html'});
      for (i = 1; i < 7; i++) {
          //write a response to the client
          response.write('<h' + i + ' style="color:blue">Hello World!</h' + i + '>'); 
      }
      response.end(); //end the response
  });
  
  /*
   * Serve the API documentation genertated by apidoc as HTML. 
   * https://apidocjs.com/
   */
  app.use("/doc", express.static('apidoc'))

  //app.use('/contact', middleware.checkToken, require('./routes/contact.js'))
  
  /* 
  * Heroku will assign a port you can use via the 'PORT' environment variable
  * To accesss an environment variable, use process.env.<ENV>
  * If there isn't an environment variable, process.env.PORT will be null (or undefined)
  * If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
  * In this case, we assign the port to be 5000 if the PORT variable isn't set
  * You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
  * let port; = process.env.PORT;
  * if(port == null) {port = 5000} 
  */ 
  app.listen(process.env.PORT || 5000, () => {
      console.log("Server up and running on port: " + (process.env.PORT || 5000));
  });