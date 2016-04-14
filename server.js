/** ==========================setup======================================== **/
//add modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
//var database = require('./config/database');

//set port, defaulted to 8080
var port = process.env.PORT || 8080;
mongoose.connect('mongodb://simpleUser:nodepass@jello.modulusmongo.net:27017/nY8pimed'); 	// Connect to local MongoDB instance.
//create an express application, Express is a routing and middleware web framework
var app = express();
//app.use mounts middleware to the specified path
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//build model
var Todo = mongoose.model("Todo", {
  text: String
});


//Binds and listens for connections on the specified host and port.
app.listen(port);
console.log("app listening on port 8080");


/** ==========================routes======================================== **/
//app.get routes HTTP GET requests with specified callback functions,
//specifies path,callback as params
var router = express.Router();

//get all the todos
function findTodos(res){
    Todo.find(function(err, todos){ //get all the todos
      if(err){
        res.send(err);
      }
      res.json(todos);
    });
}


app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){ //get all the todos
    if(err){
      res.send(err);
    }
    res.json(todos);
  });
});

//create a todo then return all the todos
app.post('/api/todos', function(req, res){

    Todo.create({
      text: req.body.text
    }, function(err, todo){  //callback
      if(err){
        res.send(err);
      }

      Todo.find(function(err, todos){ //get all the todos
        if(err){
          res.send(err);
        }
        res.json(todos);
      });
    });
});

//delete a todo based on its unique id
app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
       _id: req.params.todo_id
    }, function(err, todo){
        if(err){
          res.send('betty: ' + err);
        }

        Todo.find(function(err, todos){ //get all the todos
          if(err){
            res.send(err);
          }
          res.json(todos);
        });
    });
})

//allow index.html to see other clientside files like css and js
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
